import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Base from '../layouts/base';
import { Container, Col, Row } from '../components/grid';
import Section from '../components/section/section';
import { useAppDispatch, useAppSelector } from '../services/store';
import Slider from '../components/slider/slider';
import RowSlider from '../components/row-slider/row-slider';
import Text from '../components/text/text';
import { getMovie } from '../services/actions';
import styled from 'styled-components';

const Poster = styled.img`
  border-radius: ${({ theme }) => theme.radius.small};
  width: 100%;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => `${theme.spaces[10]}px`};
`;

const DescriptionRow = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => `${theme.spaces[4]}px`};
`;

const DescriptionHeader = styled.div`
  ${({ theme }) => `color: ${theme.colors.body.darkest};`}
  flex: 0 0 30%;
`;

const DescriptionCell = styled.div`
  flex: 1 0 70%;
  max-width: 70%;
`;


const Movie: React.FC = () => {
  const dispatch = useAppDispatch();

  const { movieId } = useParams<{ movieId: string }>();

  const { movie, isPending } = useAppSelector((store) => ({
    movie: store.movie.movie,
    isPending: store.movie.isPending
  }));

  useEffect(() => {
    dispatch(getMovie(+movieId));
  }, []);

  return (
    <Base>
      <Section last>
        <Container>
          {movie && (
            <Row>
              <Col md={3} className="pr-10">
                <Poster src={movie.poster_path} title={movie.title} />
              </Col>
              <Col md={6} className="pr-10">
                <Text variant="h2" className="mb-2">{movie.title}</Text>
                <Text variant="paragraph" className="mb-10">{movie.original_title}</Text>
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
              <Col md={3}>
                <Text variant="h5" className="mt-5">В ролях</Text>
              </Col>
            </Row>
          )}
        </Container>
      </Section>
    </Base>
  );
};

export default Movie;
