import React, { useEffect } from 'react';
import Base from '../layouts/base';
import { Container } from '../components/grid';
import Section from '../components/section/section';
import { useAppDispatch, useAppSelector } from '../services/store';
import Slider from '../components/slider/slider';
import RowSlider from '../components/row-slider/row-slider';
import Text from '../components/text/text';
import { createFetch } from '../services/slices/home';

const fetchFeatured = createFetch('featured');
const fetchPopular = createFetch('popular');
const fetchTopRated = createFetch('topRated');
const fetchUpcoming = createFetch('upcoming');
const fetchPlaying = createFetch('playing');

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { featured, popular, topRated, upcoming, playing } = useAppSelector((store) => ({
    featured: store.home.featured,
    popular: store.home.popular,
    playing: store.home.playing,
    topRated: store.home.topRated,
    upcoming: store.home.upcoming
  }));

  useEffect(() => {
    dispatch(fetchFeatured());
  }, []);

  return (
    <Base>
      <Slider movies={featured.items} isLoading={featured.isLoading} />
      <Section>
        <Container>
          <Text variant="h4">Популярные</Text>
          <RowSlider
            onAppearence={() => dispatch(fetchPopular())}
            movies={popular.items}
            isLoading={popular.isLoading}
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <Text variant="h4">Топ 100</Text>
          <RowSlider
            onAppearence={() => dispatch(fetchTopRated())}
            movies={topRated.items}
            isLoading={topRated.isLoading}
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <Text variant="h4">Сейчас в кино</Text>
          <RowSlider
            onAppearence={() => dispatch(fetchPlaying())}
            movies={playing.items}
            isLoading={playing.isLoading}
          />
        </Container>
      </Section>
      <Section last>
        <Container>
          <Text variant="h4">Скоро в кино</Text>
          <RowSlider
            onAppearence={() => dispatch(fetchUpcoming())}
            movies={upcoming.items}
            isLoading={upcoming.isLoading}
          />
        </Container>
      </Section>
    </Base>
  );
};

export default Home;
