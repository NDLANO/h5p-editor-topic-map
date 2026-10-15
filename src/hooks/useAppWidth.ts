import { useContext } from 'react';
import { AppWidthContext } from '../contexts/AppWidthContext';
import { BreakpointSize } from '../types/BreakpointSize';

/** @constant {number} largeBreakpointWidth Width in pixels of the large breakpoint. */
const largeBreakpointWidth = 1440;

/** @constant {number} mediumBreakpointWidth Width in pixels of the medium breakpoint. */
const mediumBreakpointWidth = 1024;

/** @constant {number} smallBreakpointWidth Width in pixels of the small breakpoint. */
const smallBreakpointWidth = 512;

const breakpointSize = {
  [BreakpointSize.Large]: largeBreakpointWidth,
  [BreakpointSize.Medium]: mediumBreakpointWidth,
  [BreakpointSize.Small]: smallBreakpointWidth,
};

export const useAppWidth = (): BreakpointSize => {
  const appWidth = useContext(AppWidthContext);

  const isLarge = appWidth > breakpointSize[BreakpointSize.Large];
  const isMedium = appWidth > breakpointSize[BreakpointSize.Medium];

  if (isLarge) {
    return BreakpointSize.Large;
  }

  if (isMedium) {
    return BreakpointSize.Medium;
  }

  return BreakpointSize.Small;
};
