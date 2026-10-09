import { FC, useCallback, useEffect, useRef, useState, MouseEvent, TouchEvent } from 'react';
import './ScaleHandle.scss';

export type ScaleHandleProps = {
  labelText: string;
  position:
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-right'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-left';
  onScaleStop: () => void;
  onScaleStart: () => void;
  tabIndex: number;
  onResizeByCell?: (dx: number, dy: number) => void;
};

export const ScaleHandle: FC<ScaleHandleProps> = ({
  labelText,
  position,
  onScaleStop,
  onScaleStart,
  tabIndex,
  onResizeByCell,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const className = `h5p-editor-topic-map-scale-handle-${position}`;

  const startDrag = useCallback(
    (event: MouseEvent | TouchEvent) => {
      setIsDragging(true);
      onScaleStart();

      event.stopPropagation();
    },
    [onScaleStart],
  );

  const stopDrag = useCallback(() => {
    if (!isDragging) {
      return;
    }

    setIsDragging(false);
    onScaleStop();
  }, [isDragging, onScaleStop]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!onResizeByCell) {
        return;
      }

      const directionByArrowKey: Record<string, { dx: number; dy: number }> = {
        ArrowRight: { dx: 1, dy: 0 },
        ArrowLeft: { dx: -1, dy: 0 },
        ArrowDown: { dx: 0, dy: 1 },
        ArrowUp: { dx: 0, dy: -1 },
      };

      const direction = directionByArrowKey[event.key];
      if (!direction) {
        return;
      }

      // Stop the parent Draggable from moving the item instead of resizing it
      event.preventDefault();
      event.stopPropagation();
      onResizeByCell(direction.dx, direction.dy);
    },
    [onResizeByCell],
  );

  useEffect(() => {
    /* 
      These are tied to `window`, because the
      cursor might not be on top of the element
      when the drag action ends.
    */
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);

    return () => {
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [stopDrag]);

  return (
    <div
      ref={elementRef}
      role="button"
      tabIndex={tabIndex}
      className={`h5p-editor-topic-map-scale-handle ${className}`}
      aria-label={labelText}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      onKeyDown={handleKeyDown}
    />
  );
};
