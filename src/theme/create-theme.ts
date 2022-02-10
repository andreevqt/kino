import {TTheme} from './theme';
import defaultTheme from './default';

export default (theme: Partial<TTheme>): TTheme => {
  return { ...defaultTheme, ...theme };
};
