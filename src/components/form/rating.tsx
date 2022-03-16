import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import Star from '../../icons/star';
import Check from '../../icons/check';

type TStarIconProps = {
  active?: boolean;
};

const StyledStars = styled.div`
  font-size: 0;
  display: flex;
`;

const StarWrapper = styled.div`
  cursor: pointer;
  padding-right: 4px;
`;

const StyledStar = styled((props) => (
  <StarWrapper {...props}>
    <Star />
  </StarWrapper>
)) <TStarIconProps>`
  ${({ theme, active = false }) => `
    ${active && `color: ${theme.colors.primary.base}`};
  `}
`;

const StyledLabel = styled.label`
  ${({ theme }) => `
    display: inline-block;
    margin-bottom: ${theme.spaces[1]}px;
    color: ${theme.muted};
  `}
`;

const StyledInner = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPrompt = styled.div`
  ${({ theme }) => `
    margin-left: auto;
    color: ${theme.colors.success.base};
    display: flex;
    align-items: center;
    svg {
      margin-right: 8px;
    }
  `}
`;

type TStarProps = {
  label: string;
  total?: number;
  value: number;
  className?: string;
  onChange?: (value: number) => void;
};

const Rating: React.FC<TStarProps> = ({
  label,
  total = 10,
  value,
  onChange,
  className
}) => {
  const [hover, setHover] = useState(0);

  const onClick = useCallback((value: number) => (e: React.SyntheticEvent) => {
    onChange && onChange(value);
  }, [onChange]);

  const onMouseEnter = (value: number) => () => {
    setHover(value);
  };

  const onMouseLeave = useCallback(() => setHover(value), [value]);

  const itemsToRender = useMemo(() => Array.from(Array(10).keys()).map((i) => (
    <StyledStar
      key={i}
      onClick={onClick(i + 1)}
      active={i < (hover || value)}
      onMouseEnter={onMouseEnter(i + 1)}
      onMouseLeave={onMouseLeave}
    />
  )), [hover, value, onClick, onMouseLeave]);

  return (
    <div className={className}>
      <StyledLabel>{label}</StyledLabel>
      <StyledInner>
        <StyledStars className="fontless">
          {itemsToRender}
        </StyledStars>
        <StyledPrompt>
          <Check height="16" width="16" /> Ваша оценка {value} / {total}
        </StyledPrompt>
      </StyledInner>
    </div>
  );
};

export default Rating;
