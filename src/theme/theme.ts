export type TColor = {
  lightest: string;
  light: string;
  base: string;
  dark: string;
  darkest: string;
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
  success: TColor;
  background: TColor;
  body: TColor;
  border: TColor;
  white: TColor;
  danger: TColor;
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
  10: string,
  11: string,
  12: string,
  13: string,
  14: string,
  15: string,
  16: string,
  17: string,
  18: string,
  19: string,
  20: string,
};

export type TRadius = {
  small: string;
  big: string;
  tiny: string;
};

export type TSkeleton = {
  base: string;
  highlight: string;
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
  review: string;
  mainSliderBulletBg: string;
  
  inputColor: string;
  inputBgColor: string;
  inputBgColorFocus: string;
  inputBorderColor: string;
  inputPlaceholderColor: string;

  muted: string;
};
