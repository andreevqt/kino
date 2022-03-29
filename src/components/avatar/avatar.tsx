import React from 'react';
import styled from 'styled-components';
import { TUser } from '../../services/api';

const StyledAvatar = styled.img<{ size: string }>`
  ${({ size }) => `
    border-radius: 50%;
    width: ${size};
    height: ${size};
  `}
`;

type TAvatarProps = {
  user: TUser;
  className?: string;
  size?: string;
};

const Avatar: React.FC<TAvatarProps> = ({
  user,
  className,
  size = '48px'
}) => {
  return (
    <StyledAvatar
      className={className}
      size={size}
      src={`https://eu.ui-avatars.com/api/?name=${user.name}&background=random&color=fff` || user.image}
      alt={user.name}
    />
  );
};

export default Avatar;
