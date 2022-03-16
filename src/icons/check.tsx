import React from 'react';
import { TIconProps } from '../types/common';

const Check: React.FC<TIconProps> = ({
  width = "24",
  height = "24",
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={width}
      height={height}
      {...rest}
    >
      <path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436L24 5.782z" />
    </svg>
  );
};

export default Check;
