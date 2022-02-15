import React from 'react';

type TBoxProps = {
  className?: string;
};

const Box: React.FC<TBoxProps> = ({ className, children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default Box;
