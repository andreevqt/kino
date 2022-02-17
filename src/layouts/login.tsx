import React from 'react';
import Base from './base';
import { Link } from 'react-router-dom';
import Logo from '../icons/logo';
import Header from '../components/header/base';
import styled from 'styled-components';
import { Nav } from '../components/nav/nav';
import Button from '../components/button/button';

const Background = styled.div<{ background: string }>`
  position: absolute;
  z-index: -1;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-repeat: no-repeat;
  background-image: ${({ background }) => `url('${background}')`};
`;

type TLoginProps = {
  background: string;
};

const Login: React.FC<TLoginProps> = ({ background, children }) => {
  return (
    <>
      <Background background={background} />
      {children}
    </>
  );
};

export default Login;
