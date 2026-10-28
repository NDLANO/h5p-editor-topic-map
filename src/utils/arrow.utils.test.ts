import { ArrowType } from '../types/ArrowType';
import { Position } from '../types/Position';
import { xAdjustmentEnd, yAdjustmentEnd } from './arrow.utils';

const createArrow = (
  startGridPosition: Position,
  breakpoints: Array<Position>,
  endGridPosition: Position,
): {
  arrowType: ArrowType;
  startGridPosition: Position;
  endGridPosition: Position;
  breakpoints: Array<Position>;
} => ({
  arrowType: ArrowType.Directional,
  startGridPosition,
  endGridPosition,
  breakpoints,
});

// Breakpoints are rendered in the center of their cell
const renderedBreakpoint = (coordinate: number): number => coordinate - 0.5;

describe(yAdjustmentEnd.name, () => {
  it('should keep a short downward last segment pointing down', () => {
    const arrow = createArrow({ x: 2, y: 2 }, [{ x: 2, y: 4 }], { x: 2, y: 5 });
    const end = arrow.endGridPosition.y + yAdjustmentEnd(arrow);

    expect(end).toBeGreaterThan(renderedBreakpoint(4));
  });

  it('should keep a short upward last segment after a bend pointing up', () => {
    const arrow = createArrow({ x: 2, y: 8 }, [{ x: 4, y: 8 }, { x: 4, y: 6 }], { x: 4, y: 5 });
    const end = arrow.endGridPosition.y + yAdjustmentEnd(arrow);

    expect(end).toBeLessThan(renderedBreakpoint(6));
  });

  it('should not change the adjustment of a long downward segment', () => {
    const arrow = createArrow({ x: 2, y: 2 }, [], { x: 2, y: 10 });

    expect(yAdjustmentEnd(arrow)).toBe(-1.75);
  });

  it('should not change the adjustment of a long upward segment', () => {
    const arrow = createArrow({ x: 2, y: 10 }, [], { x: 2, y: 2 });

    expect(yAdjustmentEnd(arrow)).toBe(0.5);
  });
});

describe(xAdjustmentEnd.name, () => {
  it('should keep a short rightward last segment pointing right', () => {
    const arrow = createArrow({ x: 2, y: 2 }, [{ x: 4, y: 2 }], { x: 5, y: 2 });
    const end = arrow.endGridPosition.x + xAdjustmentEnd(arrow);

    expect(end).toBeGreaterThan(renderedBreakpoint(4));
  });

  it('should keep a short leftward last segment after a bend pointing left', () => {
    const arrow = createArrow({ x: 8, y: 2 }, [{ x: 8, y: 4 }, { x: 6, y: 4 }], { x: 5, y: 4 });
    const end = arrow.endGridPosition.x + xAdjustmentEnd(arrow);

    expect(end).toBeLessThan(renderedBreakpoint(6));
  });

  it('should not change the adjustment of a long rightward segment', () => {
    const arrow = createArrow({ x: 2, y: 2 }, [], { x: 10, y: 2 });

    expect(xAdjustmentEnd(arrow)).toBe(-1.75);
  });

  it('should not change the adjustment of a long leftward segment', () => {
    const arrow = createArrow({ x: 10, y: 2 }, [], { x: 2, y: 2 });

    expect(xAdjustmentEnd(arrow)).toBe(0.5);
  });
});
