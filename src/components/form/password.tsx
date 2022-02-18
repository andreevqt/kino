import React, { useState } from 'react';
import Input, { TInputProps } from './input';

const PasswordInput = React.forwardRef<HTMLInputElement, TInputProps>((props, ref) => {
  const [hidden, setIsHidden] = useState(true);

  const onIconClick = () => {
    setIsHidden(!hidden);
  };

  return (
    <Input
      ref={ref}
      type={hidden ? 'password' : 'text'}
      onIconClick={onIconClick}
      {...props}
    />
  );
});

export default PasswordInput;
