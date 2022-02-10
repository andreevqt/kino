import { TBreakpoints } from '../../theme'

export const breakpointsMax = (name: keyof TBreakpoints, breakpoints: TBreakpoints): number | null => {
  const max = breakpoints[name];
  return max && max > 0 ? max - .02 : null;
};

export const breakpointsMin = (name: keyof TBreakpoints, breakpoints: TBreakpoints) => {
  // @ts-ignore
  const min = breakpoints[name];
  return min !== 0 ? min : null;
};

export const mediaBreakpointUp = (name: keyof TBreakpoints, content: string, breakpoints: TBreakpoints): string => {
  const min = breakpointsMin(name, breakpoints);
  if (min) {
    return `@media (min-width: ${min}px) {
      ${content}
    }`;
  }

  return content;
};

export const breakpointInfix = (name: keyof TBreakpoints, breakpoints: TBreakpoints) => {
  return breakpointsMin(name, breakpoints) === null ? `` : `-${name}`;
};

export const makeCol = (size: number | string, columns: number): string => {
  if (size && size as string === 'auto') {
    return `
      flex: 0 0 auto;
      width: auto;
      max-width: none;
    `;
  }

  if (size) {
    // @ts-ignore
    return `flex: 0 0 auto; width: ${size as number * 100 / columns}%;`;
  }

  return `
      flex: 1 1 0;
      max-width: 100%;
  `;
};
