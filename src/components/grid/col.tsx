import React from 'react';
import styled from 'styled-components';
import { makeCol, mediaBreakpointUp } from './utils';

type TCol = {
  col?: number | string,
  auto?: boolean,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  children?: React.ReactNode
}

// TODO: fix me

const Col = styled.div<TCol>`
  ${p => p.col && makeCol(p.col, p.theme.grid.columns)}
  ${p => p.auto && makeCol('auto', p.theme.grid.columns)}
  ${p => p.sm && mediaBreakpointUp(`sm`, makeCol(p.sm, p.theme.gird.columns), p.theme.breakpoints)}
  ${p => p.md && mediaBreakpointUp(`md`, makeCol(p.md, p.theme.grid.columns), p.theme.breakpoints)}
  ${p => p.lg && mediaBreakpointUp(`lg`, makeCol(p.lg, p.theme.grid.columns), p.theme.breakpoints)}
  ${p => p.xl && mediaBreakpointUp(`xl`, makeCol(p.xl, p.theme.grid.columns), p.theme.breakpoints)}
`;

export default Col;
