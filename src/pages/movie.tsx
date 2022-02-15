import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Base from '../layouts/base';
import { Container, Col, Row } from '../components/grid';
import Section from '../components/section/section';
import { useAppDispatch, useAppSelector } from '../services/store';
import Slider from '../components/slider/slider';
import RowSlider from '../components/row-slider/row-slider';
import Text from '../components/text/text';
import { getMovie, getSimilar, onPageUnload } from '../services/actions';
import styled from 'styled-components';
import LazyImg from '../components/lazy-img/lazy-img';
import Box from '../components/box/box';
import Button from '../components/button/button';

const Poster = styled(LazyImg)`
  border-radius: ${({ theme }) => theme.radius.small};
  width: 100%;
`;

const DescriptionRow = styled.div`
  display: flex;
`;

const DescriptionHeader = styled.div`
  ${({ theme }) => `color: ${theme.colors.body.darkest};`}
  flex: 0 0 30%;
`;

const DescriptionCell = styled.div`
  flex: 1 0 70%;
  max-width: 70%;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  ${DescriptionRow}:not(:last-of-type) {
    margin-bottom: ${({ theme }) => `${theme.spaces[4]}px`};
  }
`;

type TRevieBoxProps = {

};

const ReviewBoxHeader = styled.div`
  padding: ${({ theme }) => `${theme.spaces[5]}px`};
`;

const StyledReviewBox = styled.div`
  background-color: ${({ theme }) => theme.review};
  border-radius: ${({ theme }) => theme.radius.small};
`;

const ReviewBox: React.FC<TRevieBoxProps> = () => {
  return (
    <StyledReviewBox>
      <ReviewBoxHeader>
        Hello world
      </ReviewBoxHeader>
    </StyledReviewBox>
  );
};

const Movie: React.FC = () => {
  const dispatch = useAppDispatch();

  const { movieId } = useParams<{ movieId: string }>();

  const { movie, isPending, similar } = useAppSelector((store) => ({
    movie: store.movie.movie.data,
    isPending: store.movie.movie.isPending,
    similar: store.movie.similar
  }));

  useEffect(() => {

    return () => {
      dispatch(onPageUnload());
    };
  }, []);

  useEffect(() => {
    dispatch(getMovie(+movieId));
  }, [movieId]);

  return (
    <Base className="pt-10">
      <Section last>
        <Container>
          {movie && !isPending && (
            <Row>
              <Col md={9} className="pr-10">
                <Row className="mb-10">
                  <Col md={4} className="pr-10">
                    <Poster
                      alt={movie.title}
                      src={movie.poster_path}
                      placeholder={{ width: 342, height: 512 }}
                    />
                  </Col>
                  <Col md={8}>
                    <Text variant="h2" className="mb-2">{movie.title}</Text>
                    <Text variant="paragraph" className="mb-10" muted>{movie.original_title}</Text>
                    <Text variant="h4">О фильме</Text>
                    <Description>
                      <DescriptionRow>
                        <DescriptionHeader>
                          Год выхода
                        </DescriptionHeader>
                        <DescriptionCell>
                          {new Date(movie.release_date).getFullYear()}
                        </DescriptionCell>
                      </DescriptionRow>
                      <DescriptionRow>
                        <DescriptionHeader>
                          Статус
                        </DescriptionHeader>
                        <DescriptionCell>
                          {movie.status}
                        </DescriptionCell>
                      </DescriptionRow>
                      {movie.production_countries.length > 0 && (
                        <DescriptionRow>
                          <DescriptionHeader>
                            Страна
                          </DescriptionHeader>
                          <DescriptionCell>
                            {movie.production_countries.map((country) => country.name).join(', ')}
                          </DescriptionCell>
                        </DescriptionRow>
                      )}
                      <DescriptionRow>
                        <DescriptionHeader>
                          Жанр
                        </DescriptionHeader>
                        <DescriptionCell>
                          {movie.genres.map((genre) => genre.name).join(', ')}
                        </DescriptionCell>
                      </DescriptionRow>
                      <DescriptionRow>
                        <DescriptionHeader>
                          Производство
                        </DescriptionHeader>
                        <DescriptionCell>
                          {movie.production_companies.map((company) => company.name).join(', ')}
                        </DescriptionCell>
                      </DescriptionRow>
                      {
                        !!movie.budget && (
                          <DescriptionRow>
                            <DescriptionHeader>
                              Бюджет
                            </DescriptionHeader>
                            <DescriptionCell>
                              {movie.budget.toLocaleString()} $
                            </DescriptionCell>
                          </DescriptionRow>
                        )
                      }
                      {
                        !!movie.revenue && (
                          <DescriptionRow>
                            <DescriptionHeader>
                              Сборы
                            </DescriptionHeader>
                            <DescriptionCell>
                              {movie.revenue.toLocaleString()} $
                            </DescriptionCell>
                          </DescriptionRow>
                        )
                      }
                    </Description>
                  </Col>
                </Row>
                <Box className="mb-10">
                  <Text variant="h4" className="mb-5">Обзор</Text>
                  <Text variant="paragraph">{movie.overview}</Text>
                </Box>
                <Box className="mb-10">
                  <Text variant="h4">Похожие фильмы</Text>
                  <RowSlider
                    onAppearence={() => dispatch(getSimilar(+movieId))}
                    movies={similar.items}
                    isLoading={similar.isPending}
                    perView={4}
                  />
                </Box>
                <Box className="mb-10">
                  <Box className="mb-5 d-flex aic">
                    <Text variant="h4" className="mb-0 mr-5">Рецензии</Text>
                    <Button size="medium">Написать рецензию</Button>
                  </Box>
                  <ReviewBox />
                </Box>
              </Col>
              <Col md={3}>
                <Text variant="h5" className="mt-5 mb-5">В ролях</Text>
                {
                  movie.credits.cast.slice(0, 15).map((credit, i) => (
                    <Link key={i} className="d-block mb-1" to={`/people/${credit.id}`}>{credit.name}</Link>
                  ))
                }
                <Link to={`/movie/cast/${movie.credits.id}`} className="link d-block mt-4">{movie.credits.cast.length} актеров</Link>
              </Col>
            </Row>
          )}
        </Container>
      </Section>
    </Base>
  );
};

export default Movie;
