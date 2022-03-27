import React from 'react';
import styled from 'styled-components';
import { TUser } from '../../services/api';

const StyledAvatar = styled.img`
  border-radius: 50%;
  width: 48px;
  height: 48px;
`;

type TAvatarProps = {
  className?: string;
  user: TUser;
};

const Avatar: React.FC<TAvatarProps> = ({
  className,
  user
}) => {
  return (
    <StyledAvatar
      className={className}
      src={`https://eu.ui-avatars.com/api/?name=${user.name}&background=random&color=fff` || user.image}
      alt={user.name}
    />
  );
};

export default Avatar;
