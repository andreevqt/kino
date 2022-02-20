import React, { useState } from 'react';
import Input, { TInputProps } from './input';
import Eye from '../../icons/eye';
import EyeCross from '../../icons/eye-cross';

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
      icon={hidden ? <Eye width="20" height="20" /> : <EyeCross width="20" height="20" />}
      {...props}
    />
  );
});

export default PasswordInput;
