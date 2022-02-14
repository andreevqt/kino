import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TMovieData, TMovies } from '../../services/api';
import Text from '../text/text';
import { useOnScreen } from '../../hooks';
import Skeleton from '../skeleton/skeleton';
import left from '../../images/left.svg';
import right from '../../images/right.svg';
import { Navigation } from 'swiper';
import LazyImg from '../lazy-img/lazy-img';

const renderSkeleton = (count: number) => {
  return [...Array(count)].map((elem, i) => (
    <SwiperSlide key={i}>
      <Skeleton variant="rectangular" height="275px" margin="0 0 10px 0" />
      <Skeleton variant="text" width="60%" height="20px" margin="0 0 5px 0" />
      <Skeleton variant="text" width="40%" height="20px" margin="0 0 5px 0" />
    </SwiperSlide>
  ));
};

const StyledSwiper = styled.div`
  position: relative;

  .swiper {
  }

  .swiper-button-next,
  .swiper-button-prev {
    margin-top: 0;
    top: calc( 275px/2 - 42px/2);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: ${({theme}) => theme.colors.body.base};
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, .05), 0 1px 0 1px rgba(0, 0, 0, .05), 0 0 0 1px rgba(0, 0, 0, .05);
    &:hover {
      background-color: ${({theme}) => theme.colors.body.dark};
    }
  }

  .swiper-button-prev {
    left: -24px;
  }

  .swiper-button-next {
    right: -24px;
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    width: 100%;
    height: 100%;
    content: '';
    background-repeat: no-repeat;
    background-position: center;
    background-size: 16px;
  }

  .swiper-button-prev:after {
    bacground-position: left 46%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23191a1d' viewBox='0 0 24 24'%3E%3Cpath d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z'/%3E%3C/svg%3E");
  }

  .swiper-button-next:after {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23191a1d' viewBox='0 0 24 24'%3E%3Cpath d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z'/%3E%3C/svg%3E");
  }

  .swiper-button-disabled {
    
  }
`;

const StyledImage = styled(LazyImg)`
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

type TMovieCardProps = {
  movie: TMovieData;
  onClick?: () => void;
};

const MovieCard: React.FC<TMovieCardProps> = ({ onClick, movie }) => (
  <StyledCard {...(onClick && { onClick })}>
    <StyledImage src={movie.poster_path} alt={movie.title} />
    <StyledTitle variant='display2'>
      {movie.title}
    </StyledTitle>
  </StyledCard>
);

type TRowSliderProps = {
  movies: TMovies;
  onAppearence: () => void;
  isLoading?: boolean;
};

const RowSlider: React.FC<TRowSliderProps> = ({
  movies,
  onAppearence,
  isLoading = false
}) => {
  const history = useHistory();
  const [swiperInstance, setSwiper] = useState<any>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isFirstAppearence = useRef<boolean>(true);
  const onScreen = useOnScreen(ref, 5);
  const prev = useRef<HTMLDivElement>(null);
  const next = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onScreen && isFirstAppearence.current) {
      onAppearence();
      isFirstAppearence.current = false;
      swiperInstance.update();
    }
  }, [onScreen, isLoading]);

  const shouldShowNav = movies.length > 0;

  return (
    <StyledSwiper ref={ref}>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        modules={[Navigation]}
        onInit={(swiper) => {
          console.log('init');
          setSwiper(swiper);
        }}
        onUpdate={(swiper) => {
          if (movies.length > 0) {
            // @ts-ignore
            swiper.params.navigation.prevEl = prev.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = next.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
      >
        {
          isLoading || isFirstAppearence.current
            ? renderSkeleton(12)
            : movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard movie={movie} onClick={() => history.push(`/movies/${movie.id}`)} />
              </SwiperSlide>
            ))
        }
      </Swiper>
      <div ref={prev} className="swiper-button-prev" style={{ opacity: shouldShowNav ? 1 : 0 }} />
      <div ref={next} className="swiper-button-next" style={{ opacity: shouldShowNav ? 1 : 0 }} />
    </StyledSwiper>
  );
};

export default RowSlider;
