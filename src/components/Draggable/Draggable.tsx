import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { t } from '../../H5P/H5P.util';
import { ContextMenuAction } from '../../types/ContextMenuAction';
import { OccupiedCell } from '../../types/OccupiedCell';
import { Position } from '../../types/Position';
import { ResizeDirection } from '../../types/ResizeDirection';
import { Size } from '../../types/Size';
import { TranslationKey } from '../../types/TranslationKey';
import {
  calculateClosestValidPositionComponent,
  calculateClosestValidSizeComponent,
  getPointerPositionFromEvent,
} from '../../utils/draggable.utils';
import { checkIfRightSideOfGrid, positionIsFree } from '../../utils/grid.utils';
import { stripHtmlTags } from '../../utils/string.utils';
import { ContextMenu, ContextMenuButtonType } from '../ContextMenu/ContextMenu';
import { ScaleHandles } from '../ScaleHandles/ScaleHandles';
import { ToolbarButtonType } from '../Toolbar/Toolbar';
import './Draggable.scss';

const labelTextKeys: Record<string, TranslationKey> = {
  selected: 'draggable_selected',
  notSelected: 'draggable_not-selected',
};

export type DraggableProps = {
  id: string;
  label: string;
  initialXPosition: number;
  initialYPosition: number;
  updatePosition: (newPosition: Position) => void;
  updateSize: (newSize: Size) => void;
  initialWidth: number;
  initialHeight: number;
  gapSize: number;
  cellSize: number;
  gridSize: Size;
  occupiedCells: Array<OccupiedCell>;
  isPreview: boolean;
  openDeleteDialogue: (id: string) => void;
  setSelectedItem: (newItem: string | null) => void;
  selectedItem: string | null;
  startResize: (directionLock: ResizeDirection) => void;
  mouseOutsideGrid: boolean;
  editItem: (id: string) => void;
  showScaleHandles: boolean;
  onPointerDown: (pointerPosition: Position) => void;
  activeTool: ToolbarButtonType | null;
  children: React.ReactElement | Array<React.ReactElement>;
};

export const Draggable: FC<DraggableProps> = ({
  id,
  label,
  initialXPosition,
  initialYPosition,
  updatePosition,
  updateSize,
  initialWidth,
  initialHeight,
  gapSize,
  cellSize,
  gridSize,
  occupiedCells,
  isPreview,
  openDeleteDialogue,
  setSelectedItem,
  selectedItem,
  startResize,
  children,
  mouseOutsideGrid,
  editItem,
  showScaleHandles,
  onPointerDown,
  activeTool,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isSelected, setIsSelected] = useState(selectedItem === id);
  const [labelText, setLabelText] = useState(t(labelTextKeys.notSelected));
  const [pointerStartPosition, setPointerStartPosition] =
    useState<Position | null>(null);
  const [{ width, height }, setSize] = useState<Size>({
    width: calculateClosestValidSizeComponent(initialWidth, gapSize, cellSize, gridSize.width),
    height: calculateClosestValidSizeComponent(initialHeight, gapSize, cellSize, gridSize.height),
  });
  const [position, setPosition] = useState<Position>({
    x: calculateClosestValidPositionComponent(initialXPosition, gapSize, cellSize, gridSize.width, width),
    y: calculateClosestValidPositionComponent(initialYPosition, gapSize, cellSize, gridSize.height, height),
  });
  const [previousPosition, setPreviousPosition] = useState(position);
  const [isResizing, setIsResizing] = useState(false);

  // Update Draggable's size whenever the container's size changes
  useEffect(
    () =>
      setSize({
        width: calculateClosestValidSizeComponent(initialWidth, gapSize, cellSize, gridSize.width),
        height: calculateClosestValidSizeComponent(initialHeight, gapSize, cellSize, gridSize.height),
      }),
    [
      gapSize,
      cellSize,
      gridSize.height,
      gridSize.width,
      initialHeight,
      initialWidth,
    ],
  );
  // Update Draggable's position whenever the container's size changes
  useEffect(() => {
    setPosition({
      x: calculateClosestValidPositionComponent(initialXPosition, gapSize, cellSize, gridSize.width, width),
      y: calculateClosestValidPositionComponent(initialYPosition, gapSize, cellSize, gridSize.height, height),
    });
  }, [
    gapSize,
    cellSize,
    gridSize.height,
    gridSize.width,
    height,
    initialXPosition,
    initialYPosition,
    width,
  ]);

  const elementRef = useRef<HTMLDivElement>(null);

  const startDrag = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      onPointerDown(getPointerPositionFromEvent(event));
      const aToolIsActive = activeTool !== null;
      const createBoxToolIsActive = activeTool === ToolbarButtonType.CreateBox;
      if (aToolIsActive && !createBoxToolIsActive) {
        return;
      }

      setIsDragging(true);
      setIsSelected(true);
      setSelectedItem(id);

      const { x, y } = getPointerPositionFromEvent(event);

      setPointerStartPosition({
        x: x - position.x,
        y: y - position.y,
      });
    },
    [onPointerDown, activeTool, setSelectedItem, id, position.x, position.y],
  );

  const getNewPosition = useCallback((x: number, y: number) => ({ x, y }), []);

  const getClosestValidXPosition = useCallback(
    (pointerX: number) =>
      calculateClosestValidPositionComponent(
        pointerX,
        gapSize,
        cellSize,
        gridSize.width,
        width,
      ),
    [gapSize, cellSize, gridSize.width, width],
  );

  const getClosestValidYPosition = useCallback(
    (pointerY: number) =>
      calculateClosestValidPositionComponent(
        pointerY,
        gapSize,
        cellSize,
        gridSize.height,
        height,
      ),
    [gapSize, cellSize, gridSize.height, height],
  );

  const checkIfPositionIsFree = useCallback(
    (newPosition: Position): boolean =>
      positionIsFree(
        newPosition,
        id,
        { width, height },
        gridSize,
        gapSize,
        cellSize,
        occupiedCells,
      ),
    [gapSize, cellSize, gridSize, height, id, occupiedCells, width],
  );

  const stopDrag = useCallback(() => {
    const { x, y } = position;

    const closestValidXPosition = getClosestValidXPosition(x);
    const closestValidYPosition = getClosestValidYPosition(y);

    if (closestValidXPosition != null && closestValidYPosition != null) {
      const newPosition = getNewPosition(
        closestValidXPosition,
        closestValidYPosition,
      );

      if (checkIfPositionIsFree(newPosition)) {
        setPosition(newPosition);
        updatePosition(newPosition);
        setPreviousPosition(newPosition);
      }
      else {
        setPosition(previousPosition);
      }
    }

    setPointerStartPosition(null);
    setIsDragging(false);
  }, [
    position,
    getClosestValidXPosition,
    getClosestValidYPosition,
    getNewPosition,
    checkIfPositionIsFree,
    updatePosition,
    previousPosition,
  ]);

  const drag = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isDragging || !pointerStartPosition) {
        return;
      }

      if (mouseOutsideGrid) {
        stopDrag();
        return;
      }

      const { x, y } = getPointerPositionFromEvent(event);

      const newPosition = getNewPosition(
        x - pointerStartPosition.x,
        y - pointerStartPosition.y,
      );

      setPosition(newPosition);
    },
    [
      isDragging,
      pointerStartPosition,
      mouseOutsideGrid,
      getNewPosition,
      stopDrag,
    ],
  );

  const preventDefault = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  useEffect(() => {
    setLabelText(
      isSelected ? t(labelTextKeys.selected) : t(labelTextKeys.notSelected),
    );
  }, [isSelected]);

  const horizontalScaleHandleLabelText = t('scale-handle_resize-width');
  const verticalScaleHandleLabelText = t('scale-handle_resize-height');
  const cornerScaleHandleLabelText = t('scale-handle_resize-width-and-height');

  useEffect(() => {
    /* 
      These are tied to `window`, because the
      cursor might not be on top of the element
      when the drag action ends.
    */
    window.addEventListener('mousemove', drag);
    window.addEventListener('touchmove', drag);

    return () => {
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('touchmove', drag);
    };
  }, [drag]);

  const stopResize = useCallback(() => {
    stopDrag();
    setIsResizing(false);
  }, [stopDrag]);

  // Move the item one grid cell in the given direction, mirroring the mouse drag snapping
  const moveByCell = useCallback(
    (dx: number, dy: number) => {
      if (activeTool !== null || !isSelected) {
        return;
      }

      const stepSize = cellSize + gapSize;
      const targetX = getClosestValidXPosition(position.x + dx * stepSize);
      const targetY = getClosestValidYPosition(position.y + dy * stepSize);
      const newPosition = getNewPosition(targetX, targetY);

      if (!checkIfPositionIsFree(newPosition)) {
        return;
      }

      setPosition(newPosition);
      updatePosition(newPosition);
      setPreviousPosition(newPosition);
    },
    [
      activeTool,
      isSelected,
      cellSize,
      gapSize,
      position.x,
      position.y,
      getClosestValidXPosition,
      getClosestValidYPosition,
      getNewPosition,
      checkIfPositionIsFree,
      updatePosition,
    ],
  );

  // Grow or shrink the item by whole cells, resizing the bottom-right corner like the mouse handle
  const resizeByCell = useCallback(
    (dx: number, dy: number) => {
      if (isResizing) {
        return;
      }

      const stepSize = cellSize + gapSize;

      const currentWidthCells = Math.round((width + gapSize) / stepSize);
      const currentHeightCells = Math.round((height + gapSize) / stepSize);
      const maxWidthCells = Math.floor(
        (gridSize.width - position.x + gapSize) / stepSize,
      );
      const maxHeightCells = Math.floor(
        (gridSize.height - position.y + gapSize) / stepSize,
      );

      const newWidth =
        Math.min(Math.max(currentWidthCells + dx, 1), maxWidthCells) *
        stepSize -
        gapSize;
      const newHeight =
        Math.min(Math.max(currentHeightCells + dy, 1), maxHeightCells) *
        stepSize -
        gapSize;

      if (newWidth === width && newHeight === height) {
        return;
      }

      const newSize = { width: newWidth, height: newHeight };

      if (
        !positionIsFree(
          position,
          id,
          newSize,
          gridSize,
          gapSize,
          cellSize,
          occupiedCells,
        )
      ) {
        return;
      }

      setSize(newSize);
      updateSize(newSize);
    },
    [
      cellSize,
      gapSize,
      gridSize,
      height,
      id,
      isResizing,
      occupiedCells,
      position,
      updateSize,
      width,
    ],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      // Let interactive descendants (e.g. context menu buttons) keep their own key handling
      const target = event.target as HTMLElement;
      if (target !== elementRef.current && target.closest('button, input')) {
        return;
      }

      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();

          if (activeTool === ToolbarButtonType.CreateArrow) {
            // Start an arrow from this item, mirroring the pointer-down on the item
            const rect = elementRef.current?.getBoundingClientRect();
            if (rect) {
              onPointerDown({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              });
            }
            return;
          }

          if (activeTool === null && !isSelected) {
            setIsSelected(true);
            setSelectedItem(id);
          }
          return;
        case 'Escape':
          if (isSelected) {
            event.preventDefault();
            setIsSelected(false);
            setSelectedItem(null);
          }
          return;
        case 'ArrowRight':
          event.preventDefault();
          moveByCell(1, 0);
          return;
        case 'ArrowLeft':
          event.preventDefault();
          moveByCell(-1, 0);
          return;
        case 'ArrowDown':
          event.preventDefault();
          moveByCell(0, 1);
          return;
        case 'ArrowUp':
          event.preventDefault();
          moveByCell(0, -1);
          return;
        default:
        // The item only handles the keys listed above
      }
    },
    [
      activeTool,
      isSelected,
      id,
      onPointerDown,
      setSelectedItem,
      moveByCell,
    ],
  );

  const contextMenuActions: Array<ContextMenuAction> = useMemo(() => {
    const editAction: ContextMenuAction = {
      icon: ContextMenuButtonType.Edit,
      label: t('context-menu_edit'),
      onClick: () => editItem(id),
    };

    const deleteAction: ContextMenuAction = {
      icon: ContextMenuButtonType.Delete,
      label: t('context-menu_delete'),
      onClick: () => openDeleteDialogue(id),
    };

    return [editAction, deleteAction];
  }, [editItem, id, openDeleteDialogue]);

  /**
   * This offset is used to fix some of the floating point errors
   * that are placing items a few pixels off the grid.
   */
  const offset = 2;

  // The label is rich text, so strip its tags for the accessible name
  const strippedLabel = stripHtmlTags(label).trim();

  return (
    <div
      id={id}
      ref={elementRef}
      role="button"
      tabIndex={0}
      /* Use draggable="true" to benefit from screen readers' understanding of the property */
      draggable="true"
      /* Prevent default because we implement drag ourselves */
      onDragStart={preventDefault}
      aria-grabbed={isDragging}
      className={`h5p-editor-topic-map-draggable ${isPreview
      } ${activeTool === ToolbarButtonType.CreateArrow
      }`}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      style={{
        transform: `translateX(${position.x}px) translateY(${position.y}px)`,
        width: width + offset,
        height: height + offset,
        zIndex: isDragging || selectedItem === id ? 2 : undefined,
        pointerEvents: isPreview || isResizing ? 'none' : undefined,
        transition: isPreview || isResizing ? 'none' : undefined,
      }}
      aria-label={strippedLabel || labelText}
      aria-description={strippedLabel ? labelText : undefined}
      onMouseUp={stopDrag}
      onTouchEnd={stopDrag}
      onKeyDown={handleKeyDown}
      onDoubleClick={() => editItem(id)}
      data-draggable
    >
      <div className="h5p-editor-topic-map-inner" tabIndex={-1}>
        {children}
      </div>

      {activeTool !== ToolbarButtonType.CreateArrow && showScaleHandles && (
        <ScaleHandles
          setIsResizing={setIsResizing}
          startResize={startResize}
          stopResize={stopResize}
          verticalScaleHandleLabelText={verticalScaleHandleLabelText}
          horizontalScaleHandleLabelText={horizontalScaleHandleLabelText}
          cornerScaleHandleLabelText={cornerScaleHandleLabelText}
          onResizeByCell={resizeByCell}
        />
      )}
      <ContextMenu
        actions={contextMenuActions}
        show={selectedItem === id}
        turnLeft={checkIfRightSideOfGrid(position.x, gridSize.width)}
      />
    </div>
  );
};
