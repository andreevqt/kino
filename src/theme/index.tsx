import { TTheme, TBreakpoints } from './theme';
import createTheme from './create-theme';
import ThemeProvider from './theme-provider';
import useTheme from './use-theme';
import GlobalStyle from './global-style';

export type { TTheme, TBreakpoints };
export {
  ThemeProvider,
  createTheme,
  useTheme,
  GlobalStyle
};
