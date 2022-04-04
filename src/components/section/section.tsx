import React from 'react';
import styled from 'styled-components';

const Section = styled.section<{ last?: boolean }>`
    ${({ last, theme }) => `
        padding-top: ${theme.spaces[10]}px;
        ${last && `padding-bottom: ${theme.spaces[10]}px`}
    `}
 `;

export default Section;
