import { TTheme } from './theme';
import { generatePalletteItem, lighten } from './utils';

const defaultColors = {
  yellow: '#feba2b',
  white: '#fff',
  gray: '#111113',
  gray100: '#191a1d',
  gray200: '#1f2125',
  gray300: '#565c67',
  blue: '#15171e'
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
    body: generatePalletteItem(defaultColors.white),
    background: generatePalletteItem(defaultColors.gray100),
    border: generatePalletteItem(defaultColors.white),
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
    10: `${spacer * 10}`
  },

  radius: {
    small: '8px',
    big: '20px'
  },

  skeleton: {
    base: defaultColors.gray200,
    highlight: lighten(defaultColors.gray200, .1)
  },

  overlay: defaultColors.gray200
};

export default defaultTheme;
