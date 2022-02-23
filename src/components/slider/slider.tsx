import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useHistory } from 'react-router-dom';
import { TMovieData, TMovies } from '../../services/api';
import { Navigation, Autoplay, Pagination } from 'swiper';
import Text from '../text/text';
import styled from 'styled-components';
import Skeleton from '../skeleton/skeleton';
import left from '../../images/left.svg';
import right from '../../images/right.svg';

const StyledSwiper = styled(Swiper)`
  margin-top: ${({ theme }) => `${theme.spaces[8]}px`};

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

  .swiper-slide {
    transition: opacity .5s;
    width: 1250px;
    opacity: .25;
  }

  .swiper-slide__content {
    transition: opacity .5s ease .2s;
    opacity: 0;
  }

  .swiper-slide-active {
    opacity: 1;

    .swiper-slide__content {
      opacity: 1;
    }
  }

  .swiper-slide__inner {
    display: flex;
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    &::after {
      position: absolute;
      z-index: 2;
      bottom: 0;
      left: 0;
      right: 0;
      content: "";
      width: 100%;
      height: 60%;
      background-image: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(rgba(31, 33, 37, 0)),
        to(rgba(31, 33, 37, 0.8))
      );
      background-image: linear-gradient(180deg, rgba(31, 33, 37, 0) 0, rgba(31, 33, 37, 0.8));
    }
  }

  .swiper-slide__content {
    padding: 0 60px 60px 60px;
    position: absolute;
    z-index: 3;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .swiper-slide__img {
    border-radius: 20px;
    width: 100%;
    height: auto;
  }

  @keyframes countingBar {
    0% {width: 0;}
    100% {width:100%;}
  }

  .swiper-pagination-bullet {
    position: relative;
    width: 100px;
    height: 6px;
    overflow: hidden;
    margin: 0 6px !important;
    opacity: 1;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.mainSliderBulletBg};
    &::before {
      display: block;
      content: ''; 
      left: 0;
      height: 100%;
      width: 0%;
      background-color: ${({ theme }) => theme.colors.primary.base};
    }
  }

  .swiper-pagination-bullet-active {
    &::before {
      animation-name: countingBar;
      animation-duration: 6s;
      animation-timing-function: ease-in;
      animation-iteration-count: 1;
      animation-direction: alternate ;
      animation-fill-mode:forwards;
    }
  }
  
`;

type TSliderProps = {
  movies: TMovies;
  isLoading?: boolean;
};

const Slider: React.FC<TSliderProps> = ({ movies, isLoading = false }) => {
  const history = useHistory();

  return (
    <div style={{ minHeight: '700px' }}>{
      isLoading
        ? <Skeleton variant="rectangular" height="700px" />
        : (
          <StyledSwiper
            slidesPerView="auto"
            autoplay={{
              delay: 6000,
              disableOnInteraction: false
            }}
            pagination={{
              clickable: true,
            }}
            effect="fade"
            centeredSlides={true}
            spaceBetween={30}
            loop={true}
            loopedSlides={3}
            modules={[Autoplay, Navigation, Pagination]}
            navigation={true}
          >
            {
              movies.map(({ id, title, backdrop_path, genres, release_date }) => (
                <SwiperSlide key={id}>
                  <div className="swiper-slide__inner">
                    <img
                      className="swiper-slide__img"
                      alt={title}
                      src={backdrop_path}
                    />
                    <div className="swiper-slide__content">
                      <Text variant="h1" className="mb-2">{title} ({release_date})</Text>
                      <Text variant="display2" muted className="mb-0">
                        {genres.map(({ name }) => name).join(', ')}
                      </Text>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            }
          </StyledSwiper>
        )
    }</div>
  );
};

export default Slider;
