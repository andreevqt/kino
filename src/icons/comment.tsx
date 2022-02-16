import React from 'react';
import { TIconProps } from '../types/common';

const Comment: React.FC<TIconProps> = ({
  width = '24',
  height = '24'
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M22 3v13H10.357L6 19.105V16H2V3h20zm2-2H0v16.981h4V23l7-5.019h13V1zm-5 6H5V6h14v1zm0 2H5v1h14V9zm-6 3H5v1h8v-1z" />
    </svg>
  );
};

export default Comment;
