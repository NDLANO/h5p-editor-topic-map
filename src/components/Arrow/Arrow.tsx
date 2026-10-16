 
import { H5P } from 'h5p-utils';
import { FC, useMemo } from 'react';
import { t } from '../../H5P/H5P.util';
import { ArrowItemType } from '../../types/ArrowItemType';
import { ArrowType } from '../../types/ArrowType';
import { ContextMenuAction } from '../../types/ContextMenuAction';
import { Position } from '../../types/Position';
import {
  xAdjustmentEnd,
  xAdjustmentStart,
  yAdjustmentEnd,
  yAdjustmentStart,
} from '../../utils/arrow.utils';
import {
  ARROW_STROKE_WIDTH_FACTOR,
  CELL_CENTER_OFFSET,
  DEFAULT_GAP_SIZE,
} from '../../utils/constants';
import { checkIfRightSideOfGrid } from '../../utils/grid.utils';
import { ContextMenu, ContextMenuButtonType } from '../ContextMenu/ContextMenu';
import './Arrow.css';

export type ArrowProps = {
  cellSize: number;
  item: ArrowItemType;
  editItem: (itemId: string) => void;
  deleteItem: (itemId: string) => void;
  selectedItemId: string | null;
  setSelectedItemId: (itemId: string) => void;
  updateArrowType: (type: ArrowType, itemId: string) => void;
  gridWidth: number;
  arrowStartId: string | null;
};

/** @constant {number} defaultArrowRowInCells Default row, in cells, of an arrow without a stored grid position. */
const defaultArrowRowInCells = 1.5;

/** @constant {number} defaultArrowEndColumnInCells Default column, in cells, of the end of an arrow without a stored grid position. */
const defaultArrowEndColumnInCells = 6.5;

/** @constant {number} verticalArrowContextMenuXOffset Cells between the end of a vertical arrow and its context menu. */
const verticalArrowContextMenuXOffset = 2;

/** @constant {number} horizontalArrowContextMenuYOffset Cells between the end of a horizontal arrow and its context menu. */
const horizontalArrowContextMenuYOffset = 1;

/** @constant {number} arrowHeadMarkerSize Width and height of the SVG marker box that contains an arrowhead. */
const arrowHeadMarkerSize = 10;

/** @constant {number} arrowHeadMarkerRefX x coordinate of the point of the arrowhead that the line's endpoint attaches to. */
const arrowHeadMarkerRefX = 0.7;

/** @constant {number} arrowHeadMarkerRefY y coordinate of the point of the arrowhead that the line's endpoint attaches to. */
const arrowHeadMarkerRefY = 1;

// The H5P dialog falls back to a generic core body string whenever dialogText
// is falsy, so a single space renders a blank body instead of that fallback.
const BLANK_BODY = ' ';

// TODO: Share code with h5p-topic-map instead of duplicating
export const Arrow: FC<ArrowProps> = ({
  item,
  cellSize,
  editItem,
  deleteItem,
  selectedItemId,
  setSelectedItemId,
  updateArrowType,
  gridWidth,
  arrowStartId,
}) => {
  const arrowHeadID = H5P.createUUID();
  const arrowTailID = H5P.createUUID();

  const contextMenuActions: Array<ContextMenuAction> = useMemo(() => {
    const editAction: ContextMenuAction = {
      icon: ContextMenuButtonType.Edit,
      label: t('context-menu_edit'),
      onClick: () => editItem(item.id),
    };
    const deleteAction: ContextMenuAction = {
      icon: ContextMenuButtonType.Delete,
      label: t('context-menu_delete'),
      onClick: () => {
        const dialog = new H5P.ConfirmationDialog({
          headerText: t('draggable_delete-confirmation'),
          dialogText: BLANK_BODY,
          confirmText: t('draggable_delete-positive'),
          cancelText: t('draggable_delete-negative'),
          theme: true,
        }).appendTo(document.body);

        dialog.on('confirmed', () => {
          deleteItem(item.id);
        });

        dialog.show();
      },
    };

    const changeToDirectionalArrowAction: ContextMenuAction = {
      icon: ContextMenuButtonType.ArrowDirectional,
      label: t('context-menu_arrow-directional'),
      onClick: () => updateArrowType(ArrowType.Directional, item.id),
    };

    const changeToBiDirectionalArrowAction: ContextMenuAction = {
      icon: ContextMenuButtonType.ArrowBiDirectional,
      label: t('context-menu_arrow-bi-directional'),
      onClick: () => updateArrowType(ArrowType.BiDirectional, item.id),
    };

    const changeToNonDirectionalArrowAction: ContextMenuAction = {
      icon: ContextMenuButtonType.ArrowNonDirectional,
      label: t('context-menu_arrow-non-directional'),
      onClick: () => updateArrowType(ArrowType.NonDirectional, item.id),
    };

    return [
      editAction,
      changeToDirectionalArrowAction,
      changeToBiDirectionalArrowAction,
      changeToNonDirectionalArrowAction,
      deleteAction,
    ];
  }, [deleteItem, editItem, item.id, updateArrowType]);

  const isHorizontal =
    item.startPosition != null && item.endPosition != null
      ? Math.abs(item.startPosition.x - item.endPosition.x) >
      Math.abs(item.startPosition.y - item.endPosition.y)
      : true;

  let startPos = {
    x: CELL_CENTER_OFFSET * (cellSize + DEFAULT_GAP_SIZE),
    y: defaultArrowRowInCells * (cellSize + DEFAULT_GAP_SIZE),
  };

  let endPos = {
    x: defaultArrowEndColumnInCells * (cellSize + DEFAULT_GAP_SIZE),
    y: defaultArrowRowInCells * (cellSize + DEFAULT_GAP_SIZE),
  };

  if (item.startGridPosition != null && item.endGridPosition != null) {
    const xAdjustStart = xAdjustmentStart(item, isHorizontal);
    const yAdjustStart = yAdjustmentStart(item, isHorizontal);

    const xAdjust = xAdjustmentEnd(item);
    const yAdjust = yAdjustmentEnd(item);

    startPos = {
      x: (item.startGridPosition.x + xAdjustStart) * (cellSize + DEFAULT_GAP_SIZE),
      y: (item.startGridPosition.y + yAdjustStart) * (cellSize + DEFAULT_GAP_SIZE),
    };

    endPos = {
      x: (item.endGridPosition.x + xAdjust) * (cellSize + DEFAULT_GAP_SIZE),
      y: (item.endGridPosition.y + yAdjust) * (cellSize + DEFAULT_GAP_SIZE),
    };
  }

  const toPathElement = (position: Position): string => {
    return `L ${(position.x - CELL_CENTER_OFFSET) * (cellSize + DEFAULT_GAP_SIZE)} ${(position.y - CELL_CENTER_OFFSET) * (cellSize + DEFAULT_GAP_SIZE)
    }`;
  };

  const pathDef = `M ${startPos.x} ${startPos.y} ${item.breakpoints?.map(toPathElement).join(' ') ?? ''
  } L ${endPos.x} ${endPos.y}`;

  const contextMenuPosition: Position = {
    x: isHorizontal
      ? (startPos.x + endPos.x) / 2
      : endPos.x
        - verticalArrowContextMenuXOffset * (cellSize + DEFAULT_GAP_SIZE),
    y: isHorizontal
      ? endPos.y
        - horizontalArrowContextMenuYOffset * (cellSize + DEFAULT_GAP_SIZE)
      : (startPos.y + endPos.y) / 2,
  };

  return (
    <div className="h5p-editor-topic-map-arrow">
      <svg className="h5p-editor-topic-map-arrow-svg">
        <defs>
          <marker
            id={arrowHeadID}
            markerWidth={arrowHeadMarkerSize}
            markerHeight={arrowHeadMarkerSize}
            refX={arrowHeadMarkerRefX}
            refY={arrowHeadMarkerRefY}
            orient="auto"
          >
            <path
              d="M0,0 L0,2 L1.5,1 z"
              fill="var(--theme-color-4)"
              className="h5p-editor-topic-map-arrow-path"
              onClick={() => setSelectedItemId(item.id)}
            />
          </marker>
          <marker
            id={arrowTailID}
            markerWidth={arrowHeadMarkerSize}
            markerHeight={arrowHeadMarkerSize}
            refX={arrowHeadMarkerRefX}
            refY={arrowHeadMarkerRefY}
            orient="auto-start-reverse"
          >
            <path
              d="M0,0 L0,2 L1.5,1 z"
              fill="var(--theme-color-4)"
              className="h5p-editor-topic-map-arrow-path"
              onClick={() => setSelectedItemId(item.id)}
            />
          </marker>
        </defs>
        <path
          className={`${selectedItemId === null
            ? 'h5p-editor-topic-map-path'
            : 'h5p-editor-topic-map-path-selected'} ${
            arrowStartId === null ? 'h5p-editor-topic-map-selectable' : ''
          }`}
          d={pathDef}
          fill="transparent"
          stroke="var(--theme-color-4)"
          strokeWidth={cellSize * ARROW_STROKE_WIDTH_FACTOR}
          markerEnd={
            item.arrowType === ArrowType.BiDirectional ||
              item.arrowType === ArrowType.Directional
              ? `url(#${arrowHeadID})`
              : ''
          }
          markerStart={
            item.arrowType === ArrowType.BiDirectional ? `url(#${arrowTailID})` : ''
          }
          onClick={() => setSelectedItemId(item.id)}
          onDoubleClick={() => editItem(item.id)}
        />
      </svg>

      <ContextMenu
        actions={contextMenuActions}
        show={selectedItemId === item.id}
        turnLeft={checkIfRightSideOfGrid(contextMenuPosition.x, gridWidth)}
        x={contextMenuPosition.x}
        y={contextMenuPosition.y}
        gridWidth={gridWidth}
      />
    </div>
  );
};
