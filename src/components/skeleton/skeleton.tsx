import React from 'react';
import styled, { keyframes } from 'styled-components';

type SkeletonVariant =
  | 'text'
  | 'rounded'
  | 'rectangular';

const skeletonAnimation = keyframes`
  from {
    background-position: -200px 0;
  }
  to {
    background-position: calc(200px + 100%) 0;
  }
` ;

const StyledSkeleton = styled.div<{ width?: string; height?: string; variant: SkeletonVariant; margin?: string, borderRadius?: string }>`
    display: block;
    width: ${({ width }) => width ?? `100%`};
    height: ${({ height }) => height ?? 'auto'};
    font-size: 0;
    background-color: ${({ theme }) => theme.skeleton.base};
    background-size: 200px 100%;
    background-repeat: no-repeat;
    background-image: ${({ theme }) => `linear-gradient(90deg, ${theme.skeleton.base}, ${theme.skeleton.highlight}, ${theme.skeleton.base})`};
    animation: ${skeletonAnimation} 1.2s ease-in-out infinite;
    border-radius: ${({ variant, borderRadius }) => variant === 'rounded' ? '50%;' : borderRadius};
    margin: ${({ margin }) => margin};
`;

type TSkeletonProps = {
  count?: number;
  width?: string;
  height?: string;
  margin?: string;
  borderRadius?: string;
  variant?: SkeletonVariant,
  className?: string;
};

const Skeleton: React.FC<TSkeletonProps> = ({
  count = 1,
  width,
  height,
  margin,
  variant = 'text',
  borderRadius = '3px',
  className
}) => {
  return (
    <>
      {
        [...Array(count)].map((elem, i) => (
          <div key={i} className={className}>
            <StyledSkeleton
              variant={variant}
              margin={margin}
              width={width}
              height={height}
              borderRadius={borderRadius}
            />
          </div>
        ))
      }
    </>
  );
};

export default Skeleton;
