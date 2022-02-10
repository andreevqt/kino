import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TMovieData, TMovies } from '../../services/api';
import Text from '../text/text';
import { useOnScreen } from '../../hooks';
import Skeleton from '../skeleton/skeleton';
import left from '../../images/left.svg';
import right from '../../images/right.svg';
import { Navigation } from 'swiper';

const renderSkeleton = (count: number) => {
  return [...Array(count)].map((elem, i) => (
    <SwiperSlide key={i}>
      <Skeleton variant="rectangular" height="275px" margin="0 0 10px 0" />
      <Skeleton variant="text" width="60%" height="20px" margin="0 0 5px 0" />
      <Skeleton variant="text" width="40%" height="20px" margin="0 0 5px 0" />
    </SwiperSlide>
  ));
};

const StyledSwiper = styled(Swiper)`
  overflow: visible;
  .swiper-button-next,
  .swiper-button-prev {
    top: 0;
    height: 100%;
    width: 40px;
    transform: scale(1);
    transition: transform .2s ease;
    &:hover {
      transform: scale(1.3);
    }
  }

  .swiper-button-prev {
    left: -60px;
  }

  .swiper-button-next {
    right: -60px;
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    width: 100%;
    height: 100%;
    content: '';
    background-repeat: no-repeat;
    background-position: center;
  }

  .swiper-button-prev:after {
    background-image: url(${left});
  }

  .swiper-button-next:after {
    background-image: url(${right});
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${({ theme }) => `${theme.radius.small}`};
  margin-bottom: ${({ theme }) => `${theme.spaces[3]}px`};
`;

const StyledTitle = styled(Text)`
  margin-bottom: 0;
`;

const StyledCard = styled.div`
  cursor: pointer;
  transition: transform .3s ease;
  transform: translateY(0);

  &:hover {
    transform: translateY(-5px);
  }
`;

const MovieCard: React.FC<{ movie: TMovieData }> = ({ movie }) => (
  <StyledCard>
    <StyledImage src={movie.poster_path} alt={movie.title} />
    <StyledTitle variant='display2'>
      {movie.title}
    </StyledTitle>
  </StyledCard>
)

const RowSlider = ({
  movies,
  onAppearence,
  isLoading = false
}: {
  movies: TMovies;
  onAppearence: () => void;
  isLoading?: boolean
}) => {
  const [swiperInstance, setSwiper] = useState<any>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isFirstAppearence = useRef<boolean>(true);
  const onScreen = useOnScreen(ref, 5);

  useEffect(() => {
    if (onScreen && isFirstAppearence.current) {
      onAppearence();
      isFirstAppearence.current = false;
      swiperInstance.update();
    }
  }, [onScreen, isLoading]);

  return (
    <div ref={ref}>
      <StyledSwiper
        slidesPerView={6}
        spaceBetween={30}
        onInit={(swiper) => setSwiper(swiper)}
      >
        {
          isLoading || isFirstAppearence.current
            ? renderSkeleton(12)
            : movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard movie={movie} />
              </SwiperSlide>
            ))
        }
      </StyledSwiper>
    </div>
  );
};

export default RowSlider;
