import React from 'react';
import styled from 'styled-components';
import { Container } from '../grid';

const StyledHeader = styled.header<{ transparent?: boolean }>`
  background-color: ${({ theme, transparent }) => transparent ? 'transparent' : theme.colors.background.lightest};
  padding: ${({ theme }) => `${theme.spaces[5]}px 0`};
  & > ${Container} {
    display: flex;
    align-items: center;
  }
` ;

type THeaderProps = {
  transparent?: boolean;
  className?: string;
};

const Header: React.FC<THeaderProps> = ({
  transparent = false,
  children,
  className
}) => {
  return (
    <StyledHeader transparent={transparent} className={className}>
      <Container>
        {children}
      </Container>
    </StyledHeader>
  );
};

export default Header;
