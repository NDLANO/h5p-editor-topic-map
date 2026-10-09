import { FC } from 'react';
import { Icon } from '../Icons/Icons';
import { ToolbarButtonType } from '../Toolbar/Toolbar';
import './ToolbarButton.scss';

export type ToolbarButtonProps = {
  icon: ToolbarButtonType;
  label: string;
  onClick: React.MouseEventHandler;
  showActive: boolean;
  active: boolean;
  isDisabled: boolean;
};

export const ToolbarButton: FC<ToolbarButtonProps> = ({
  icon,
  label,
  onClick,
  showActive,
  active,
  isDisabled,
}) => {
  return (
    <button
      type="button"
      className={
        active && showActive
          ? 'h5p-editor-topic-map-toolbar-button active'
          : 'h5p-editor-topic-map-toolbar-button'
      }
      disabled={isDisabled}
      onClick={onClick}
      aria-label={label}
    >
      <Icon icon={icon} className="h5p-editor-topic-map-icon" />
      <div className="h5p-editor-topic-map-tooltip">{label}</div>
    </button>
  );
};
