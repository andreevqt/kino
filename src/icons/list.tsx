import React from 'react';
import { TIconProps } from '../types/common';

const List: React.FC<TIconProps> = ({
  className,
  width = '24',
  height = '24'
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    fill="currentColor"
    viewBox="0 0 24 24">
    <path d="M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z" />
  </svg>
);

export default List;
