import './ContextMenuButton.scss';
import { Icon } from '../Icons/Icons';
import { ContextMenuButtonType } from '../ContextMenu/ContextMenu';
import { FC, MouseEventHandler } from 'react';

export type ContextMenuButtonProps = {
  icon: ContextMenuButtonType;
  label: string;
  onClick: MouseEventHandler;
};

export const ContextMenuButton: FC<ContextMenuButtonProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <button
      type="button"
      className="h5p-editor-topic-map-context-menu-button"
      onClick={onClick}
      aria-label={label}
    >
      <Icon icon={icon} className="h5p-editor-topic-map-icon" />
      <div className="h5p-editor-topic-map-tooltip">{label}</div>
    </button>
  );
};
