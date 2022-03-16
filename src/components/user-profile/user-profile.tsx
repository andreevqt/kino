import React from 'react';
import styled from 'styled-components';
import Text from '../text/text';

const StyledUserProfile = styled.div`
  margin-left: ${({ theme }) => theme.spaces[3]}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

type TUserProfileProps = {
  name: string;
  reviewsCount: number;
};

const UserProfile: React.FC<TUserProfileProps> = ({
  name,
  reviewsCount
}) => (
  <StyledUserProfile>
    <Text variant="display2" className="mb-0">{name}</Text>
    <Text variant="display3" className="mb-0" muted>{reviewsCount} рецензия</Text>
  </StyledUserProfile>
);

export default UserProfile;
