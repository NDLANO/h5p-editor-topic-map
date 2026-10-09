import {
  Close,
  Content,
  Description,
  Overlay,
  Root,
  Title,
} from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { FC, ReactElement } from 'react';
import { t } from '../../H5P/H5P.util';
import './Dialog.scss';

type DialogSize = 'medium' | 'large';

export type DialogProps = {
  isOpen: boolean;
  title: string;
  description?: string | undefined;
  onOpenChange: (open: boolean) => void;
  size: DialogSize;
  children: ReactElement | null | Array<ReactElement | null>;
};

const maxWidths: Record<DialogSize, number> = {
  medium: 560,
  large: 750,
};

export const Dialog: FC<DialogProps> = ({
  isOpen,
  title,
  description,
  onOpenChange,
  children,
  size,
}) => {
  const closeButtonLabel = t('dialog_close');

  const maxWidth = maxWidths[size];

  return (
    <Root open={isOpen} onOpenChange={onOpenChange}>
      <Overlay className="h5p-editor-topic-map-overlay" />
      <Content className="h5p-editor-topic-map-content" style={{ maxWidth }}>
        <Title className="h5p-editor-topic-map-title">{title}</Title>
        {description ?
          <Description>{description}</Description> :
          <Description className="h5p-editor-topic-map-visually-hidden" aria-hidden="true" />
        }
        <Close className="h5p-editor-topic-map-close-button" aria-label={closeButtonLabel}>
          <Cross2Icon />
        </Close>
        {children}
      </Content>
    </Root>
  );
};
