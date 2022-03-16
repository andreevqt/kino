import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useHistory } from 'react-router-dom';
import Base from '../layouts/base';
import { Container, Col, Row } from '../components/grid';
import Section from '../components/section/section';
import { useAppDispatch, useAppSelector } from '../services/store';
import RowSlider from '../components/row-slider/row-slider';
import Text from '../components/text/text';
import styled from 'styled-components';
import LazyImg from '../components/lazy-img/lazy-img';
import Box from '../components/box/box';
import Button from '../components/button/button';
import { fetchMovie, fetchSimilar, onPageUnload, fetchReviews } from '../services/slices/movie';
import MovieDescription from '../components/movie-description/movie-description';
import { TLocationState } from '../types/common';
import AppearBox from '../components/appear-box/appear-box';
import ReviewBox from '../components/review-box/review-box';
import ReviewBoxSkeleton from '../components/review-box/review-box-skeleton';

const Poster = styled(LazyImg)`
  border-radius: ${({ theme }) => theme.radius.small};
  margin-bottom: ${({ theme }) => `${theme.spaces[5]}px`};
  width: 100%;
`;

const Movie: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation<TLocationState>();
  const history = useHistory();

  const { movieId } = useParams<{ movieId: string }>();

  const { movie, reviews, isPending, similar } = useAppSelector((store) => ({
    movie: store.movie.movie.data,
    isPending: store.movie.movie.isLoading,
    similar: store.movie.similar,
    reviews: store.movie.reviews
  }));

  const onAddReviewClick = () => history.push({
    pathname: `/movies/${movieId}/reviews/add`,
    state: { background: location }
  });

  useEffect(() => {
    return () => {
      dispatch(onPageUnload());
    };
  }, []);

  useEffect(() => {
    dispatch(onPageUnload());
    dispatch(fetchMovie(+movieId));
  }, [movieId]);

  return (
    <Base>
      <Section last>
        <Container>
          {
            movie && !isPending && (
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
                  <Box className="mb-10">
                    <Text variant="h4" className="mb-5">Обзор</Text>
                    <Text variant="paragraph">{movie.overview}</Text>
                  </Box>
                  <Box className="mb-10">
                    <Text variant="h4">Похожие фильмы</Text>
                    <RowSlider
                      onAppearence={() => dispatch(fetchSimilar(+movieId))}
                      movies={similar.items}
                      isLoading={similar.isLoading}
                      perView={4}
                    />
                  </Box>
                  <Box className="mb-10">
                    <Box className="mb-5 d-flex aic">
                      {reviews.items.length > 0 && (
                        <Text variant="h4" className="mb-0 mr-5">Рецензии</Text>
                      )}
                    </Box>
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
                          <Box className="d-flex jcc">
                            <Button onClick={() => dispatch(fetchReviews(+movieId))} variant="secondary">
                              Загрузить еще
                            </Button>
                          </Box>
                        )
                      }
                    </AppearBox>
                  </Box>
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
