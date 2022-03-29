import React from 'react';
import styled, { css } from 'styled-components';

type TextVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'display1'
  | 'display2'
  | 'display3'
  | 'display4'
  | 'paragraph';

const elements: Record<TextVariants, React.ElementType> = {
  display1: 'div',
  display2: 'div',
  display3: 'div',
  display4: 'div',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  paragraph: 'p',
};

const getVariant = (variant: TextVariants) => {
  switch (variant) {
    case 'h1': {
      return css`
        margin-bottom: ${({ theme }) => `${theme.spaces[7]}px`};
        font-size: ${({ theme }) => `${theme.font.sizes[4]}px`};
      `
    }
    case 'h2': {
      return css`
        font-size: ${({ theme }) => `${theme.font.sizes[5]}px`};
        margin-bottom: ${({ theme }) => `${theme.spaces[5]}px`};
      `;
    }
    case 'h3': {
      return css`
        font-size: ${({ theme }) => `${theme.font.sizes[4]}px`};
        margin-bottom: ${({ theme }) => `${theme.spaces[5]}px`};
      `;
    }
    case 'h4': {
      return css`
        font-size: ${({ theme }) => `${theme.font.sizes[3]}px`};
        margin-bottom: ${({ theme }) => `${theme.spaces[5]}px`};
      `;
    }
    case 'h5': {
      return css`
        font-size: ${({ theme }) => `${theme.font.sizes[2]}px`};
        margin-bottom: ${({ theme }) => `${theme.spaces[5]}px`};
      `;
    }
    case 'paragraph': {
      return css`
        margin-bottom: ${({ theme }) => `${theme.spaces[5]}px`};
      `;
    }
    case 'display1': {
      return css`
        display: inline-block;
        font-weight: 500;
        font-size: ${({ theme }) => `${theme.font.sizes[3]}px`};
        margin-bottom: ${({ theme }) => `${theme.font.sizes[3]}px`};
      `;
    }
    case 'display2': {
      return css`
        display: inline-block;
        font-weight: 500;
        font-size: ${({ theme }) => `${theme.font.sizes[2]}px`};
        margin-bottom: ${({ theme }) => `${theme.font.sizes[3]}px`};
      `;
    }
    case 'display3': {
      return css`
        display: inline-block;
        font-weight: 500;
        font-size: ${({ theme }) => `${theme.font.sizes[1]}px`};
        margin-bottom: ${({ theme }) => `${theme.font.sizes[3]}px`};
      `;
    }
    case 'display4': {
      return css`
        display: inline-block;
        font-weight: 500;
        font-size: ${({ theme }) => `${theme.font.sizes[0]}px`};
        margin-bottom: ${({ theme }) => `${theme.font.sizes[3]}px`};
      `;
    }
    default: {
      return css``;
    }
  }
};

type TStyledTextProps = {
  variant: TextVariants;
  muted?: boolean;
  bold?: boolean;
};

const StyledText = styled.div<TStyledTextProps>`
  ${({ muted, theme, bold, variant }) => css`
    ${getVariant(variant)}
    ${muted && `color: ${theme.muted};`}
    ${bold && `font-weight: 700;`}
  `}
`;

type TTextProps = TStyledTextProps & {
  className?: string;
};

const Text: React.FC<TTextProps> = ({ variant, children, className, muted = false, bold = false }) => {
  const el = elements[variant];
  return (
    <StyledText variant={variant} as={el} className={className} muted={muted} bold={bold}>
      {children}
    </StyledText>
  );
};

export default Text;
