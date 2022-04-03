import React, { useEffect } from 'react';
import { useParams, Link, useLocation, useHistory } from 'react-router-dom';
import Base from '../layouts/base';
import { Container, Col, Row } from '../components/grid';
import Section from '../components/section/section';
import { useAppDispatch, useAppSelector } from '../services/store';
import RowSlider from '../components/row-slider/row-slider';
import Text from '../components/text/text';
import styled from 'styled-components';
import LazyImg from '../components/lazy-img/lazy-img';
import Button from '../components/button/button';
import { fetchMovie, fetchSimilar, reset, fetchReviews } from '../services/slices/movie';
import MovieDescription from '../components/movie-description/movie-description';
import { TLocationState } from '../types/common';
import AppearBox from '../components/appear-box/appear-box';
import ReviewBox from '../components/review-box/review-box';
import ReviewBoxSkeleton from '../components/review-box/review-box-skeleton';
import Skeleton from '../components/skeleton/skeleton';

const PosterSkeleton = styled(Skeleton).attrs(() => ({ variant: 'rectangular' }))`
  padding-top: 150%;
  position: relative;
  div {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
  }
`;

const MovieSkeleton: React.FC = () => (
  <Row>
    <Col md={9} className="pr-10">
      <Row>
        <Col md={4} className="pr-10">
          <PosterSkeleton />
        </Col>
        <Col md={8}>
          <Skeleton height="40px" borderRadius="3px" className="mb-10" />
          <Skeleton height="24px" borderRadius="3px" width="30%" className="mb-5" />
          <Row>
            <Col md={3}>
              <Skeleton count={10} height="16px" borderRadius="3px" className="mb-2" />
            </Col>
            <Col md={5}>
              <Skeleton count={10} height="16px" borderRadius="3px" className="mb-2" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
    <Col md={3}>
      <Skeleton count={12} height="16px" borderRadius="3px" width="40%" className="mb-2" />
    </Col>
  </Row>
);

const Poster = styled(LazyImg)`
  ${({ theme }) => `
    width: 100%;
    border-radius: 3px;
    margin-bottom: ${theme.spaces[5]}px;
  `}
`;

const Movie: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation<TLocationState>();
  const history = useHistory();

  const { movieId } = useParams<{ movieId: string }>();

  const { movie, reviews, isLoading, similar } = useAppSelector((store) => ({
    movie: store.movie.movie.data,
    isLoading: store.movie.movie.isLoading,
    similar: store.movie.similar,
    reviews: store.movie.reviews
  }));

  const onAddReviewClick = () => history.push({
    pathname: `/movies/${movieId}/reviews/add`,
    state: { background: location }
  });

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    dispatch(reset());
    dispatch(fetchMovie(+movieId));
  }, [movieId]);

  return (
    <Base>
      <Section last>
        <Container>
          {
            isLoading
              ? <MovieSkeleton />
              : movie && (
                <Row>
                  <Col md={9} className="pr-10">
                    <Row className="mb-10">
                      <Col md={4} className="pr-10">
                        <Poster
                          alt={movie.title}
                          src={movie.poster_path}
                          placeholder={{
                            width: 342,
                            height: 512
                          }}
                        />
                        <Button size="medium" onClick={onAddReviewClick} fullWidth>Написать рецензию</Button>
                      </Col>
                      <Col md={8}>
                        <Text variant="h2" className="mb-2">{movie.title}</Text>
                        <Text variant="paragraph" className="mb-10" muted>{movie.original_title}</Text>
                        <Text variant="h4">О фильме</Text>
                        <MovieDescription movie={movie} />
                      </Col>
                    </Row>
                    {
                      movie.overview && (
                        <div className="mb-10">
                          <Text variant="h4" className="mb-5">Обзор</Text>
                          <Text variant="paragraph">{movie.overview}</Text>
                        </div>
                      )
                    }
                    <div className="mb-10">
                      <Text variant="h4">Похожие фильмы</Text>
                      <RowSlider
                        onAppearence={() => dispatch(fetchSimilar(+movieId))}
                        movies={similar.items}
                        isLoading={similar.isLoading}
                        perView={4}
                      />
                    </div>
                    <div className="mb-10">
                      <div className="mb-5 d-flex aic">
                        {reviews.items.length > 0 && (
                          <Text variant="h4" className="mb-0 mr-5">Рецензии</Text>
                        )}
                      </div>
                      <AppearBox
                        onAppearence={() => {
                          if (!reviews.loaded) {
                            dispatch(fetchReviews(+movieId));
                          }
                        }}
                      >
                        {
                          reviews.items.map((review) => (
                            <ReviewBox key={review.id} review={review} />
                          ))
                        }
                        {
                          reviews.isLoading && (
                            <ReviewBoxSkeleton />
                          )
                        }
                        {
                          reviews.hasMore && !reviews.isLoading && reviews.items.length > 0 && (
                            <div className="d-flex jcc">
                              <Button onClick={() => dispatch(fetchReviews(+movieId))} variant="secondary">
                                Загрузить еще
                              </Button>
                            </div>
                          )
                        }
                      </AppearBox>
                    </div>
                  </Col>
                  <Col md={3}>
                    <Text variant="h5" className="mt-5 mb-5">В ролях</Text>
                    {
                      movie.credits.cast
                        .slice(0, 15)
                        .map((credit, i) => (
                          <Link
                            key={i}
                            className="d-block mb-1"
                            to={`/people/${credit.id}`}
                          >
                            {credit.name}
                          </Link>
                        ))
                    }
                    <Link
                      to={`/movie/cast/${movie.credits.id}`}
                      className="link d-block mt-4"
                    >
                      {movie.credits.cast.length} актеров
                    </Link>
                  </Col>
                </Row>
              )
          }
        </Container>
      </Section>
    </Base>
  );
};

export default Movie;
