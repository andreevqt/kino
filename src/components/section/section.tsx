import React from 'react';
import styled from 'styled-components';

const Section = styled.section<{ last?: boolean }>`
    overflow: hidden;
    padding-top: ${({ theme }) => `${theme.spaces[10]}px`};
    ${({ last, theme }) => last && `padding-bottom: ${theme.spaces[10]}px`};
 `;

export default Section;
