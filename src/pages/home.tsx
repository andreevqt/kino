import React, { useEffect } from 'react';
import Base from '../layouts/base';
import { Container } from '../components/grid';
import Section from '../components/section/section';
import { useAppDispatch, useAppSelector } from '../services/store';
import { getFeaturedMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../services/actions';
import Slider from '../components/slider/slider';
import RowSlider from '../components/row-slider/row-slider';
import Text from '../components/text/text';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { featured, popular, topRated, upcoming } = useAppSelector((store) => ({
    featured: store.home.featured,
    popular: store.home.popular,
    topRated: store.home.topRated,
    upcoming: store.home.upcoming,
  }));

  useEffect(() => {
    dispatch(getFeaturedMovies());
  }, []);

  return (
    <Base>
      <Slider movies={featured.items} isLoading={featured.isPending} />
      <Section>
        <Container>
          <Text variant="h4">Популярные</Text>
          <RowSlider
            onAppearence={() => dispatch(getPopularMovies())}
            movies={popular.items}
            isLoading={popular.isPending}
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <Text variant="h4">Топ 100</Text>
          <RowSlider
            onAppearence={() => dispatch(getTopRatedMovies())}
            movies={topRated.items}
            isLoading={topRated.isPending}
          />
        </Container>
      </Section>
      <Section last>
        <Container>
          <Text variant="h4">Скоро в кино</Text>
          <RowSlider
            onAppearence={() => dispatch(getUpcomingMovies())}
            movies={upcoming.items}
            isLoading={upcoming.isPending}
          />
        </Container>
      </Section>
    </Base>
  );
};

export default Home;
