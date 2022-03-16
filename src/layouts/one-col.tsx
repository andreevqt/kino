import React from 'react';
import { Container } from '../components/grid';
import Base from './base';

type TBaseProps = {
  className?: string;
};

const OneCol: React.FC<TBaseProps> = ({
  children,
  className
}) => {
  return (
    <Base className={className}>
      <Container size="sm">
        {children}
      </Container>
    </Base>
  );
};

export default OneCol;
