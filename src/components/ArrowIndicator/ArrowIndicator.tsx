import { FC } from 'react';
import { Position } from '../../types/Position';
import { DEFAULT_GAP_SIZE } from '../../utils/constants';

export type ArrowIndicatorProps = {
  position: Position;
  cellSize: number;
};

export const ArrowIndicator: FC<ArrowIndicatorProps> = ({
  position,
  cellSize,
}) => {
  const placement = {
    x: (position.x - 0.5) * (cellSize + DEFAULT_GAP_SIZE),
    y: (position.y - 0.5) * (cellSize + DEFAULT_GAP_SIZE),
  };

  return (
    <circle
      cx={placement.x}
      cy={placement.y}
      r={cellSize / 3}
      strokeWidth="2"
      stroke="var(--theme-color-4)"
      fill="var(--theme-color-3)"
    />
  );
};
