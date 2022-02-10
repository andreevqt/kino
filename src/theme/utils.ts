import color from 'color';
import { TColor } from './theme';

export const lighten = (c: string, amount: number) => {
  return color(c)
    .lighten(amount)
    .hsl()
    .string();
};

export const darken = (c: string, amount: number) => {
  return color(c)
    .darken(amount)
    .hsl()
    .string();
};

export const alpha = (c: string, amount: number) => {
  return color(c)
    .alpha(amount)
    .hsl()
    .string();
};

export const generatePalletteItem = (c: string): TColor => {
  return {
    base: c,
    lightest: lighten(c, .2),
    light: lighten(c, .1),
    dark: darken(c, .2),
  }
};
