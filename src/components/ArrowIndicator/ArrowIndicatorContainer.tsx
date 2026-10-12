import { FC } from 'react';
import { Position } from '../../types/Position';
import { DEFAULT_GAP_SIZE } from '../../utils/constants';
import './ArrowIndicator.css';

export type ArrowIndicatorProps = {
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
    return `${(position.x - 0.5) * (cellSize + DEFAULT_GAP_SIZE)} ${(position.y - 0.5) * (cellSize + DEFAULT_GAP_SIZE)
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
        strokeOpacity={0.5}
        strokeWidth={cellSize * 0.66}
      />
    </svg>
  );
};
