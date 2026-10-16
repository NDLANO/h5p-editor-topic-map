import { FC } from 'react';
import { Position } from '../../types/Position';
import { CELL_CENTER_OFFSET, DEFAULT_GAP_SIZE } from '../../utils/constants';

/** @constant {number} indicatorRadiusDivisor Divides the cell size to get the radius of an arrow indicator. */
const indicatorRadiusDivisor = 3;

/** @constant {number} indicatorStrokeWidth Stroke width of an arrow indicator in pixels. */
const indicatorStrokeWidth = 2;

type ArrowIndicatorProps = {
  position: Position;
  cellSize: number;
};

export const ArrowIndicator: FC<ArrowIndicatorProps> = ({
  position,
  cellSize,
}) => {
  const placement = {
    x: (position.x - CELL_CENTER_OFFSET) * (cellSize + DEFAULT_GAP_SIZE),
    y: (position.y - CELL_CENTER_OFFSET) * (cellSize + DEFAULT_GAP_SIZE),
  };

  return (
    <circle
      cx={placement.x}
      cy={placement.y}
      r={cellSize / indicatorRadiusDivisor}
      strokeWidth={indicatorStrokeWidth}
      stroke="var(--theme-color-4)"
      fill="var(--theme-color-3)"
    />
  );
};
