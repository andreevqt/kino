export type TColor = {
  lightest: string;
  light: string;
  base: string;
  dark: string;
};

export type TContainer = {
  maxWidth: number;
};

export type TFont = {
  sizes: Array<number>,
  family: string;
};

export type TBreakpoints = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type TGrid = {
  gutter: number;
  columns: number;
};

export type TColors = {
  primary: TColor;
  secondary: TColor;
  background: TColor;
  body: TColor;
  border: TColor;
};

export type TSpaces = {
  1: string,
  2: string,
  3: string,
  4: string,
  5: string,
  6: string,
  7: string,
  8: string,
  9: string,
  10: string
};

export type TRadius = {
  small: string;
  big: string
};

export type TSkeleton = {
  base: string,
  highlight: string
};

export type TTheme = {
  font: TFont;
  grid: TGrid;
  breakpoints: TBreakpoints;
  container: TContainer;
  colors: TColors;
  spaces: TSpaces;
  radius: TRadius;
  skeleton: TSkeleton;
  overlay: string;
};
