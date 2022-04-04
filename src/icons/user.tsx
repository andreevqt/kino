import React from 'react';
import { TIconProps } from '../types/common';

const User: React.FC<TIconProps> = ({
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
    <path d="M19 7.001A7 7 0 114.999 7 7 7 0 0119 7zm-1.598 7.18A8.937 8.937 0 0112 16.001a8.953 8.953 0 01-5.407-1.822C2.521 15.972 0 21.555 0 24h24c0-2.423-2.6-8.006-6.598-9.819z" />
  </svg>
);

export default User;
