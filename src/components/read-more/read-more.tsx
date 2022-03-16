import React, { useState } from 'react';
import styled from 'styled-components';
import Text from '../text/text';

type TReadMoreProps = {
  text: string;
  limit?: number;
};

const StyledButton = styled.button`
  background-color: transparent;
  font-weight: 500;
  border: 0;
  padding: 0;
  color: inherit;
  border-bottom: 1px solid rgba(255,255,255, .2);
`;

const ReadMore: React.FC<TReadMoreProps> = ({
  text,
  limit = 200
}) => {
  const [isShown, setIsShown] = useState(false);
  return (
    <>
      <Text variant="paragraph">
        {
          isShown ? text : text.slice(0, limit)
        }
      </Text>
      {!isShown && (text.length >= limit) && (
        <StyledButton
          type="button"
          onClick={() => setIsShown(true)}
        >
          Показать всю рецензию
        </StyledButton>
      )}
    </>
  );
};

export default ReadMore;
