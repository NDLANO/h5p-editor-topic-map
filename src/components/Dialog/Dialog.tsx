import {
  Content,
  Description,
  Overlay,
  Root,
} from '@radix-ui/react-dialog';
import { FC, ReactElement } from 'react';
import { t } from '../../H5P/H5P.util';
import './Dialog.css';

type DialogProps = {
  isOpen: boolean;
  title: string;
  description?: string | undefined;
  onOpenChange: (open: boolean) => void;
  children: ReactElement | null | Array<ReactElement | null>;
};

export const Dialog: FC<DialogProps> = ({
  isOpen,
  title,
  description,
  onOpenChange,
  children,
}) => {
  const closeButtonLabel = t('dialog_close');

  return (
    <Root open={isOpen} onOpenChange={onOpenChange}>
      <Overlay className="h5p-editor-topic-map-overlay" />
      <Content className="h5p-editor-topic-map-content">
        <div className="h5p-editor-topic-map-title-container">
          <div className="h5p-editor-topic-map-title">{title}</div>
          {description ?
            <Description>{description}</Description> :
            <Description className="h5p-editor-topic-map-visually-hidden" aria-hidden="true" />
          }
          <button
            className="h5p-editor-topic-map-close-button"
            aria-label={closeButtonLabel}
            onClick={() => onOpenChange(false)}
          />
        </div>
        {children}
      </Content>
    </Root>
  );
};
