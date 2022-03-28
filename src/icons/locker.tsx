import React from 'react';
import { TIconProps } from '../types/common';

const Locker: React.FC<TIconProps> = ({
  className,
  width = '24',
  height = '24'
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M18 10V6A6 6 0 006 6v4H3v14h18V10h-3zM8 10V6c0-2.206 1.794-4 4-4s4 1.794 4 4v4H8z" />
    </svg>
  );
};

export default Locker;
