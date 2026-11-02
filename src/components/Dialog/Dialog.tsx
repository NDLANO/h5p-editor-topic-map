import {
  FC,
  KeyboardEvent as ReactKeyboardEvent,
  ReactElement,
  useEffect,
  useId,
  useRef,
} from 'react';
import { t } from '../../H5P/H5P.util';
import './Dialog.css';

type DialogProps = {
  isOpen: boolean;
  title: string;
  description?: string | undefined;
  onOpenChange: (open: boolean) => void;
  children: ReactElement | null | Array<ReactElement | null>;
};

const imageEditingPopupSelector = '.h5p-editing-image-popup-background';

/**
 * H5P appends some popups to the body element, outside of the dialog.
 * They must remain usable while the dialog is open.
 */
const h5pPopupSelector = [
  imageEditingPopupSelector,
  '.h5p-confirmation-dialog-background',
  '.cke_combopanel',
].join(', ');

const tabbableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]',
].join(', ');

const getTabbables = (container: HTMLElement): Array<HTMLElement> =>
  Array.from(container.querySelectorAll<HTMLElement>(tabbableSelector))
    .filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0);

/**
 * Keep keyboard focus within container when tabbing.
 * @param event Keyboard event.
 * @param container Container to keep focus in.
 */
const loopTabFocus = (event: KeyboardEvent, container: HTMLElement): void => {
  const tabbables = getTabbables(container);
  if (tabbables.length === 0) {
    event.preventDefault();
    return;
  }

  const first = tabbables[0];
  const last = tabbables[tabbables.length - 1];
  const activeElement = document.activeElement;

  if (event.shiftKey && (activeElement === first || activeElement === container)) {
    event.preventDefault();
    last.focus();
  }
  else if (!event.shiftKey && activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const isFocusable = (element: Element | null): element is HTMLElement =>
  element instanceof HTMLElement && element.isConnected && element !== document.body;

/**
 * Make H5P's image editing popup keyboard accessible: Move focus into it
 * once it is visible, keep focus inside, cancel on Escape and restore focus
 * when it is closed.
 * @param background Background element of the image editing popup.
 * @returns Cleanup function.
 */
const handleImageEditingPopup = (background: HTMLElement): (() => void) => {
  const previouslyFocusedElement = document.activeElement;

  const visibilityObserver = new MutationObserver((_mutations, observer) => {
    if (!background.classList.contains('hidden')) {
      observer.disconnect();
      getTabbables(background)[0]?.focus();
    }
  });

  if (background.classList.contains('hidden')) {
    visibilityObserver.observe(background, { attributes: true, attributeFilter: ['class'] });
  }
  else if (!background.contains(document.activeElement)) {
    getTabbables(background)[0]?.focus();
  }

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      background.querySelector<HTMLElement>('.h5p-editing-image-cancel-button')?.click();
    }
    else if (event.key === 'Tab') {
      loopTabFocus(event, background);
    }
  };
  background.addEventListener('keydown', handleKeyDown);

  return () => {
    visibilityObserver.disconnect();
    background.removeEventListener('keydown', handleKeyDown);

    if (!isFocusable(document.activeElement) && isFocusable(previouslyFocusedElement)) {
      previouslyFocusedElement.focus();
    }
  };
};

export const Dialog: FC<DialogProps> = ({
  isOpen,
  title,
  description,
  onOpenChange,
  children,
}) => {
  const closeButtonLabel = t('dialog_close');
  const titleId = useId();
  const descriptionId = useId();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!isOpen || !content) {
      return;
    }

    const previouslyFocusedElement = document.activeElement;
    let lastFocusedElement: HTMLElement = getTabbables(content)[0] ?? content;
    lastFocusedElement.focus();

    // Keep focus inside the dialog or inside H5P popups opened from it
    const handleFocusIn = (event: FocusEvent): void => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (content.contains(target) && target instanceof HTMLElement) {
        lastFocusedElement = target;
      }
      else if (!target.closest(h5pPopupSelector)) {
        (lastFocusedElement.isConnected ? lastFocusedElement : content).focus();
      }
    };
    document.addEventListener('focusin', handleFocusIn);

    const imageEditingPopupCleanups = new Map<Node, () => void>();
    const bodyObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement && node.matches(imageEditingPopupSelector)) {
            imageEditingPopupCleanups.get(node)?.();
            imageEditingPopupCleanups.set(node, handleImageEditingPopup(node));
          }
        });

        mutation.removedNodes.forEach((node) => {
          imageEditingPopupCleanups.get(node)?.();
          imageEditingPopupCleanups.delete(node);
        });
      });
    });
    bodyObserver.observe(document.body, { childList: true });

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      bodyObserver.disconnect();
      imageEditingPopupCleanups.forEach((cleanup) => cleanup());

      if (isFocusable(previouslyFocusedElement)) {
        previouslyFocusedElement.focus();
      }
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>): void => {
    // Content such as CKEditor may handle Escape itself
    if (event.key === 'Escape' && !event.defaultPrevented) {
      event.stopPropagation();
      onOpenChange(false);
    }
    else if (event.key === 'Tab' && contentRef.current) {
      loopTabFocus(event.nativeEvent, contentRef.current);
    }
  };

  return (
    <>
      <div
        className="h5p-editor-topic-map-overlay"
        onClick={() => onOpenChange(false)}
      />
      <div
        ref={contentRef}
        className="h5p-editor-topic-map-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <div className="h5p-editor-topic-map-title-container">
          <div className="h5p-editor-topic-map-title" id={titleId}>{title}</div>
          {description ? <p id={descriptionId}>{description}</p> : null}
          <button
            className="h5p-editor-topic-map-close-button"
            aria-label={closeButtonLabel}
            onClick={() => onOpenChange(false)}
          />
        </div>
        {children}
      </div>
    </>
  );
};
