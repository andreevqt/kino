import { TTheme } from './theme';
import { generatePalletteItem, lighten, alpha, darken } from './utils';
import color from 'color';

const defaultColors = {
  yellow: '#feba2b',
  white: '#fff',
  gray: '#111113',
  gray100: '#191a1d',
  gray200: '#1f2125',
  gray300: '#565c67',
  blue: '#15171e',
  green: '#3bb33b',
  red: '#ff3347'
};

const spacer = 4;

const defaultTheme: TTheme = {
  font: {
    sizes: [14, 16, 18, 24, 32, 36, 40],
    family: 'Gilroy, sans-serif '
  },

  container: {
    maxWidth: 1280
  },

  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400
  },

  grid: {
    gutter: 15,
    columns: 12
  },

  colors: {
    primary: generatePalletteItem(defaultColors.yellow),
    secondary: generatePalletteItem(defaultColors.gray300),
    success: generatePalletteItem(defaultColors.green),
    body: generatePalletteItem(defaultColors.white),
    background: generatePalletteItem(defaultColors.gray100),
    border: generatePalletteItem(defaultColors.white),
    white: generatePalletteItem(defaultColors.white),
    danger: generatePalletteItem(defaultColors.red)
  },

  spaces: {
    1: `${spacer * 1}`,
    2: `${spacer * 2}`,
    3: `${spacer * 3}`,
    4: `${spacer * 4}`,
    5: `${spacer * 5}`,
    6: `${spacer * 6}`,
    7: `${spacer * 7}`,
    8: `${spacer * 8}`,
    9: `${spacer * 9}`,
    10: `${spacer * 10}`,
    11: `${spacer * 11}`,
    12: `${spacer * 12}`,
    13: `${spacer * 13}`,
    14: `${spacer * 14}`,
    15: `${spacer * 15}`,
    16: `${spacer * 16}`,
    17: `${spacer * 17}`,
    18: `${spacer * 18}`,
    19: `${spacer * 19}`,
    20: `${spacer * 20}`,
  },

  radius: {
    tiny: '4px',
    small: '8px',
    big: '20px'
  },

  skeleton: {
    base: defaultColors.gray200,
    highlight: lighten(defaultColors.gray200, .1)
  },

  review: defaultColors.gray200,

  overlay: defaultColors.gray200,

  mainSliderBulletBg: alpha(defaultColors.gray100, .4),

  inputColor: defaultColors.white,
  inputBgColor: defaultColors.gray100,
  inputBgColorFocus: lighten(defaultColors.gray100, .4),
  inputBorderColor: darken(defaultColors.white, .7),
  inputPlaceholderColor: darken(defaultColors.white, .4),

  muted: darken(defaultColors.white, .4).toString()
};

export default defaultTheme;
