import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Base from '../layouts/base';
import { Container, Col, Row } from '../components/grid';
import Section from '../components/section/section';
import { useAppDispatch, useAppSelector } from '../services/store';
import Slider from '../components/slider/slider';
import RowSlider from '../components/row-slider/row-slider';
import Text from '../components/text/text';
import styled from 'styled-components';
import LazyImg from '../components/lazy-img/lazy-img';
import Box from '../components/box/box';
import Button from '../components/button/button';
import Star from '../icons/star';
import CommentIcon from '../icons/comment';
import Heart from '../icons/heart';
import ReadMore from '../components/read-more/read-more';
import { fetchMovie, fetchSimilar, onPageUnload } from '../services/slices/movie';

const Poster = styled(LazyImg)`
  border-radius: ${({ theme }) => theme.radius.small};
  width: 100%;
`;

const DescriptionRow = styled.div`
  display: flex;
`;

const DescriptionHeader = styled.div`
  ${({ theme }) => `color: ${theme.muted};`}
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

type TReviewBoxProps = {
  last?: boolean;
};

const ReviewBoxHeader = styled.div`
  padding: ${({ theme }) => `${theme.spaces[5]}px`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background.base};
  display: flex;
`;

const ReviewBoxBody = styled.div`
  padding: ${({ theme }) => `${theme.spaces[5]}px`};
`;

const ReviewBoxFooter = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.background.base};
  padding: ${({ theme }) => `${theme.spaces[5]}px`};
`

const StyledReviewBox = styled.div<TReviewBoxProps>`
  background-color: ${({ theme }) => theme.review};
  border-radius: ${({ theme }) => theme.radius.small};
  ${({ theme, last }) => !last && `margin-bottom: ${theme.spaces[5]}px;`}
`;

const UserProfile = styled.div`
  margin-left: ${({ theme }) => theme.spaces[3]}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 48px;
  height: 48px;
`;

const ReviewDate = styled(Text).attrs(() => ({ muted: true, variant: 'display3' }))`
  margin-bottom: 0;
`;

const ReviewMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
`;

const ReviewRating = styled(Text).attrs(() => ({ variant: 'display2' }))`
  display: flex;
  align-items: center;
  margin-bottom: 0;
`;

const StarIcon = styled(Star).attrs(() => ({ width: "20", height: "20" }))`
  margin-top: -1px;
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.primary.base};
`;

const ReviewMetaWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
  svg {
    margin-right: 8px;
  }
`;

type TReviewMetaLinkProps = {
  className?: string;
  icon: React.ReactNode;
  count?: number;
}

const ReviewMetaBtn: React.FC<TReviewMetaLinkProps> = ({
  icon,
  className,
  count = 0
}) => {
  return (
    <ReviewMetaWrapper
      className={className}
    >
      {icon}
      {count > 0 && count}
    </ReviewMetaWrapper>
  );
};

const StyledReviewLikeBtn = styled.div<{ active?: boolean }>`
  ${({ active, theme }) => active && `color: ${theme.colors.danger.base}`};
`;

const ReviewLikeBtn: React.FC<{ active?: boolean }> = ({
  active = false
}) => {
  return (
    <StyledReviewLikeBtn active={active}>
      <ReviewMetaBtn icon={<Heart width="16" height="16" />} />
    </StyledReviewLikeBtn>
  )
};

const ReviewBox: React.FC<TReviewBoxProps> = ({ last = false }) => {
  return (
    <StyledReviewBox last={last}>
      <ReviewBoxHeader>
        <Avatar src="https://eu.ui-avatars.com/api/?name=John+Doe&background=random&color=fff" alt="John Doe" />
        <UserProfile>
          <Text variant="display2" className="mb-0">Джон Доу</Text>
          <Text variant="display3" className="mb-0" muted>1 рецензия</Text>
        </UserProfile>
        <ReviewMeta>
          <ReviewRating>9/10<StarIcon /></ReviewRating>
          <ReviewDate>9 октября 2007 в 20:32</ReviewDate>
        </ReviewMeta>
      </ReviewBoxHeader>
      <ReviewBoxBody>
        <Text variant="h4">Лучшее фэнтези за всю историю</Text>
        <ReadMore text="Повседневная практика показывает, что реализация намеченных плановых заданий влечет за собой процесс внедрения и модернизации соответствующий условий активизации. Товарищи! постоянное информационно-пропагандистское обеспечение нашей деятельности играет важную роль в формировании существенных финансовых и административных условий." />
      </ReviewBoxBody>
      <ReviewBoxFooter>
        <ReviewLikeBtn />
        <ReviewMetaBtn icon={<CommentIcon width="16" height="16" />} />
      </ReviewBoxFooter>
    </StyledReviewBox>
  );
};

const Movie: React.FC = () => {
  const dispatch = useAppDispatch();

  const { movieId } = useParams<{ movieId: string }>();

  const { movie, isPending, similar } = useAppSelector((store) => ({
    movie: store.movie.movie.data,
    isPending: store.movie.movie.isLoading,
    similar: store.movie.similar
  }));

  useEffect(() => {
    return () => {
      dispatch(onPageUnload());
    };
  }, []);

  useEffect(() => {
    dispatch(fetchMovie(+movieId));
  }, [movieId]);

  return (
    <Base>
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
                          {movie.release_date}
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
                    onAppearence={() => dispatch(fetchSimilar(+movieId))}
                    movies={similar.items}
                    isLoading={similar.isLoading}
                    perView={4}
                  />
                </Box>
                <Box className="mb-10">
                  <Box className="mb-5 d-flex aic">
                    <Text variant="h4" className="mb-0 mr-5">Рецензии</Text>
                    <Button size="medium">Написать рецензию</Button>
                  </Box>
                  <ReviewBox />
                  <ReviewBox />
                  <ReviewBox />
                  <ReviewBox last />
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
