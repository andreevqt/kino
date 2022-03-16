import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { get } from '../../services/slices/review';
import { useAppDispatch, useAppSelector } from '../../services/store';
import Button from '../button/button';
import Input from '../form/input';
import Rating from '../form/rating';
import Text from '../text/text';

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

type TParams = {
  movieId: string;
  reviewId: string;
};

const SingleReview: React.FC = () => {
  const history = useHistory();
  const { reviewId } = useParams<TParams>();

  const { review, isLoading } = useAppSelector((store) => store.review.single);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(get(+reviewId));
  }, []);

  return (
    <>
      {review && (
        <>
          <Text variant="h3" className="mt-10 mb-10">{review.title}</Text>
          <Text variant="paragraph" className="mt-10 mb-10">{review.content}</Text>
        </>
      )}
    </>
  );
};

export default SingleReview;
