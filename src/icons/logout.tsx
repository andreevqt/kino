import React from 'react';
import { TIconProps } from '../types/common';

const Logout: React.FC<TIconProps> = ({
  className,
  width = '24',
  height = '24'
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
  >
    <path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm2-7v2h12v16h-12v2h14v-20h-14z"/>
  </svg>
);

export default Logout;
