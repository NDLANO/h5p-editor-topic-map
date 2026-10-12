import { FC } from 'react';
import { ToolbarButtonType } from '../Toolbar/Toolbar';
import './ToolbarButton.css';

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
        `h5p-editor-topic-map-toolbar-button ${icon}${active && showActive ? " active" : ""}`
      }
      disabled={isDisabled}
      onClick={onClick}
      aria-label={label}
    >
      <div className="h5p-editor-topic-map-tooltip">{label}</div>
    </button>
  );
};
