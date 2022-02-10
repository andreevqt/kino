import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import {TTheme} from './theme';

export default () => useContext<TTheme>(ThemeContext);
