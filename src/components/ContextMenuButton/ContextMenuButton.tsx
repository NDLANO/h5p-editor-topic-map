import { H5P } from '../../H5P/H5P.util';
import './ContextMenuButton.css';
import { ContextMenuButtonType } from '../ContextMenu/ContextMenu';
import { FC, MouseEventHandler, useEffect, useRef } from 'react';

type ContextMenuButtonProps = {
  icon: ContextMenuButtonType;
  label: string;
  onClick: MouseEventHandler;
};

export const ContextMenuButton: FC<ContextMenuButtonProps> = ({
  icon,
  label,
  onClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // H5P.Tooltip is an imperative library, so it is attached to the button
  // through a ref and removed on unmount. The tooltip text is read from the
  // button's aria-label and kept in sync by the library's mutation observer.
  useEffect(() => {
    const button = buttonRef.current;
    const createTooltip = H5P?.Tooltip;
    if (!button || !createTooltip) {
      return;
    }

    const tooltip = new createTooltip(button);

    return () => tooltip.remove();
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`h5p-editor-topic-map-context-menu-button ${icon}`}
      onClick={onClick}
      aria-label={label}
    />
  );
};
