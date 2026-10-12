import './ContextMenuButton.css';
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
      className={`h5p-editor-topic-map-context-menu-button ${icon}`}
      onClick={onClick}
      aria-label={label}
    >
      <div className="h5p-editor-topic-map-tooltip">{label}</div>
    </button>
  );
};
