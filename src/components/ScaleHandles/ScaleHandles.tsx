import { FC } from 'react';
import { ResizeDirection } from '../../types/ResizeDirection';
import { ScaleHandle } from '../ScaleHandle/ScaleHandle';

export type ScaleHandlesProps = {
  setIsResizing: (isResizing: boolean) => void;
  startResize: (handlePosition: ResizeDirection) => void;
  stopResize: () => void;
  verticalScaleHandleLabelText: string;
  horizontalScaleHandleLabelText: string;
  cornerScaleHandleLabelText: string;
  onResizeByCell: (dx: number, dy: number) => void;
};

export const ScaleHandles: FC<ScaleHandlesProps> = ({
  setIsResizing,
  startResize,
  stopResize,
  verticalScaleHandleLabelText,
  horizontalScaleHandleLabelText,
  cornerScaleHandleLabelText,
  onResizeByCell,
}) => {
  return (
    <>
      <ScaleHandle
        position="top"
        onScaleStart={() => {
          setIsResizing(true);
          startResize('horizontal-top');
        }}
        onScaleStop={() => stopResize()}
        labelText={verticalScaleHandleLabelText}
        tabIndex={-1}
      />

      <ScaleHandle
        position="top-right"
        onScaleStart={() => {
          setIsResizing(true);
          startResize('top');
        }}
        onScaleStop={() => stopResize()}
        labelText={verticalScaleHandleLabelText}
        tabIndex={-1}
      />
      <ScaleHandle
        position="right"
        onScaleStart={() => {
          setIsResizing(true);
          startResize('vertical');
        }}
        onScaleStop={() => stopResize()}
        labelText={horizontalScaleHandleLabelText}
        tabIndex={-1}
      />
      <ScaleHandle
        position="bottom-right"
        onScaleStart={() => {
          setIsResizing(true);
          startResize('none');
        }}
        onScaleStop={() => stopResize()}
        labelText={cornerScaleHandleLabelText}
        tabIndex={0}
        onResizeByCell={onResizeByCell}
      />

      <ScaleHandle
        position="bottom"
        onScaleStart={() => {
          setIsResizing(true);
          startResize('horizontal');
        }}
        onScaleStop={() => stopResize()}
        labelText={verticalScaleHandleLabelText}
        tabIndex={-1}
      />

      <ScaleHandle
        position="bottom-left"
        onScaleStart={() => {
          setIsResizing(true);
          startResize('left');
        }}
        onScaleStop={() => stopResize()}
        labelText={verticalScaleHandleLabelText}
        tabIndex={-1}
      />

      <ScaleHandle
        position="left"
        onScaleStart={() => {
          setIsResizing(true);
          startResize('vertical-left');
        }}
        onScaleStop={() => stopResize()}
        labelText={horizontalScaleHandleLabelText}
        tabIndex={-1}
      />

      <ScaleHandle
        position="top-left"
        onScaleStart={() => {
          setIsResizing(true);
          startResize('top-left');
        }}
        onScaleStop={() => stopResize()}
        labelText={horizontalScaleHandleLabelText}
        tabIndex={-1}
      />
    </>
  );
};
