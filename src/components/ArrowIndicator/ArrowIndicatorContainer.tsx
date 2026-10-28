import { FC } from 'react';
import { Position } from '../../types/Position';
import {
  ARROW_STROKE_WIDTH_FACTOR,
  CELL_CENTER_OFFSET,
  DEFAULT_GAP_SIZE,
} from '../../utils/constants';
import './ArrowIndicator.css';

/** @constant {number} arrowIndicatorOpacity Opacity of arrow line that previews an arrow while it is being drawn. */
const arrowIndicatorOpacity = 0.5;

type ArrowIndicatorProps = {
  arrowIndicators: React.ReactElement[];
  breakpoints: Position[];
  cellSize: number;
  currentMousePosition: Position | null;
};

// TODO: Share code with h5p-topic-map instead of duplicating
export const ArrowIndicatorContainer: FC<ArrowIndicatorProps> = ({
  arrowIndicators,
  breakpoints,
  cellSize,
  currentMousePosition,
}) => {
  const toPathElement = (position: Position): string => {
    // eslint-disable-next-line @stylistic/ts/max-len
    return `${(position.x - CELL_CENTER_OFFSET) * (cellSize + DEFAULT_GAP_SIZE)} ${(position.y - CELL_CENTER_OFFSET) * (cellSize + DEFAULT_GAP_SIZE)
    }`;
  };
  const pathDef =
    breakpoints && breakpoints.length > 0
      ? `M ${toPathElement(breakpoints[0])} ${breakpoints
        .map((pos) => `L ${toPathElement(pos)}`)
        .join(' ')} ${currentMousePosition ? `L ${toPathElement(currentMousePosition)}` : ''
      }`
      : '';
  return (
    <svg className="h5p-editor-topic-map-arrow-indicator-svg">
      {arrowIndicators}
      <path
        d={pathDef}
        fill="transparent"
        stroke="var(--theme-color-4)"
        strokeOpacity={arrowIndicatorOpacity}
        strokeWidth={cellSize * ARROW_STROKE_WIDTH_FACTOR}
      />
    </svg>
  );
};
