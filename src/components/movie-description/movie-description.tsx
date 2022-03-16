import React from 'react';
import styled from 'styled-components';
import { TMovieDataFull } from '../../services/api';

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

type TMovieDescriptionProps = {
  movie: TMovieDataFull;
}

const MovieDescription: React.FC<TMovieDescriptionProps> = ({
  movie
}) => {
  return (
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
            {movie.production_countries
              .map((country) => country.name)
              .join(', ')}
          </DescriptionCell>
        </DescriptionRow>
      )}
      <DescriptionRow>
        <DescriptionHeader>
          Жанр
        </DescriptionHeader>
        <DescriptionCell>
          {movie.genres
            .map((genre) => genre.name)
            .join(', ')}
        </DescriptionCell>
      </DescriptionRow>
      <DescriptionRow>
        <DescriptionHeader>
          Производство
        </DescriptionHeader>
        <DescriptionCell>
          {movie.production_companies
            .map((company) => company.name)
            .join(', ')}
        </DescriptionCell>
      </DescriptionRow>
      {!!movie.budget && (
        <DescriptionRow>
          <DescriptionHeader>
            Бюджет
          </DescriptionHeader>
          <DescriptionCell>
            {movie.budget.toLocaleString()} $
          </DescriptionCell>
        </DescriptionRow>
      )}
      {!!movie.revenue && (
        <DescriptionRow>
          <DescriptionHeader>
            Сборы
          </DescriptionHeader>
          <DescriptionCell>
            {movie.revenue.toLocaleString()} $
          </DescriptionCell>
        </DescriptionRow>
      )}
    </Description>
  );
};

export default MovieDescription;
