import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TMovieData, TMovies } from '../../services/api';
import Text from '../text/text';
import { useOnScreen } from '../../hooks';
import Skeleton from '../skeleton/skeleton';
import { Navigation } from 'swiper';
import LazyImg from '../lazy-img/lazy-img';

const renderSkeleton = (count: number) => {
  return [...Array(count)].map((elem, i) => (
    <SwiperSlide key={i}>
      <Skeleton variant="rectangular" height="265px" margin="0 0 10px 0" />
      <Skeleton variant="text" width="60%" height="20px" margin="0 0 5px 0" />
      <Skeleton variant="text" width="40%" height="20px" margin="0 0 5px 0" />
    </SwiperSlide>
  ));
};

const StyledSwiper = styled.div`
  position: relative;
  margin: 0 -5px;

  .swiper {
  }

  .swiper-button-next,
  .swiper-button-prev {
    opacity: 0;
    margin-top: 0;
    top: calc( 275px/2 - 42px/2);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.body.base};
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, .05), 0 1px 0 1px rgba(0, 0, 0, .05), 0 0 0 1px rgba(0, 0, 0, .05);
    &:hover {
      background-color: ${({ theme }) => theme.colors.body.dark};
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

  .swiper-button-initialized {
    opacity: 1;
  }

  .swiper-button-disabled {
    opacity: 0;
  }
`;

const StyledTag = styled.div`
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.success.base};
  color: ${({ theme }) => theme.colors.white.base};
  padding: 2px 10px;
  font-weight: 500;
`;

const StyledImageWrapper = styled.div`
  position: relative;
  font-size: 0;
  margin-bottom: ${({ theme }) => `${theme.spaces[3]}px`};
  padding-top: 150%;
  display: flex;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: ${({ theme }) => `${theme.radius.small}`};
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    border-radius: ${({ theme }) => `${theme.radius.small}`};
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    content: '';
    background-color: rgba(0, 0, 0, .4);
    transition: all .2s ease;
  }

  ${StyledTag} {
    position: absolute;
    z-index: 2;
    left: -5px;
    top: 5px;
    font-size: 14px;
  }
`;

const StyledTitle = styled(Text)`
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all .2s ease;
`;

const StyledDescription = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const StyledCard = styled.div`
  cursor: pointer;
  padding: 0 5px;
  &:hover {
    ${StyledImageWrapper}::after {
      visibility: visible;
      opacity: 1;
    }

    ${StyledTitle} {
      color: ${({ theme }) => theme.colors.primary.base};
    }
  }
`;

type TMovieCardProps = {
  movie: TMovieData;
  onClick?: () => void;
};

const MovieCard: React.FC<TMovieCardProps> = ({ onClick, movie }) => (
  <StyledCard {...(onClick && { onClick })} title={movie.title}>
    <StyledImageWrapper >
      <LazyImg src={movie.poster_path} alt={movie.title} />
      <StyledTag>{movie.vote_average}</StyledTag>
    </StyledImageWrapper>
    <StyledTitle variant="display2">
      {movie.title}
    </StyledTitle>
    <StyledDescription variant="display3" className="mb-0" muted>
      {movie.genres.map((genre) => genre.name).join(', ')}
    </StyledDescription>
  </StyledCard>
);

type TRowSliderProps = {
  movies: TMovies;
  onAppearence: () => void;
  perView?: number;
  isLoading?: boolean;
};

const RowSlider: React.FC<TRowSliderProps> = ({
  movies,
  onAppearence,
  isLoading = false,
  perView = 6
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
  const navigationClasses = shouldShowNav ? 'swiper-button-initialized' : '';

  return (
    <StyledSwiper ref={ref}>
      <Swiper
        slidesPerView={perView}
        spaceBetween={30}
        modules={[Navigation]}
        onInit={(swiper) => {
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
            ? renderSkeleton(perView)
            : movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard movie={movie} onClick={() => history.push({
                  pathname: `/movies/${movie.id}`
                })} />
              </SwiperSlide>
            ))
        }
      </Swiper>
      <div ref={prev} className={`swiper-button-prev ${navigationClasses}`} />
      <div ref={next} className={`swiper-button-next ${navigationClasses}`} />
    </StyledSwiper>
  );
};

export default RowSlider;
