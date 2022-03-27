import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Base from '../layouts/base';
import Text from '../components/text/text';
import { Container, Row } from '../components/grid';
import { get } from '../services/slices/single-review';
import { useAppSelector, useAppDispatch } from '../services/store';
import Skeleton from '../components/skeleton/skeleton';
import Avatar from '../components/avatar/avatar';

const SingleReviewSkeleton: React.FC = () => (
  <>
    <Skeleton height="16px" borderRadius="3px" className="mb-2" />
    <Skeleton height="16px" borderRadius="3px" className="mb-2" />
    <Skeleton height="16px" borderRadius="3px" className="mb-2" />
    <Skeleton height="16px" borderRadius="3px" className="mb-2" />
    <Skeleton height="16px" borderRadius="3px" className="mb-2" />
    <Skeleton height="16px" borderRadius="3px" className="mb-2" />
    <Skeleton height="16px" borderRadius="3px" className="mb-2" />
    <Skeleton height="16px" borderRadius="3px" className="mb-2" />
    <Skeleton height="16px" borderRadius="3px" className="mb-2" />
    <Skeleton height="16px" borderRadius="3px" className="mb-2" />
    <Skeleton height="16px" borderRadius="3px" className="mb-2" />
    <Skeleton height="16px" borderRadius="3px" className="mb-2" />
  </>
);

const ReviewHeading = styled.div`
  ${({ theme }) => `
    display: flex;
    margin-bottom: ${theme.spaces[10]}px;
  `}
`;

const ReviewMeta = styled.div`
  
`;

const SingleReview: React.FC = () => {
  const dispatch = useAppDispatch();
  const { reviewId } = useParams<{ reviewId: string }>();
  const { review, isLoading } = useAppSelector((store) => store.singleReview);

  useEffect(() => {
    dispatch(get(+reviewId));
  }, []);

  return (
    <Base>
      <Container size="sm" className="pt-10">
        {isLoading
          ? <SingleReviewSkeleton />
          : review && (
            <>
              <ReviewHeading>
                <Avatar user={review.author} className="mr-4" />
                <ReviewMeta>
                  <Text variant="h4" className="mb-0">
                    {review.title}
                  </Text>
                  <Text variant="display3" className="mb-0" muted>
                    <Link to={`/authors/${review.author.id}`} className="link">{review.author.name}</Link>
                    &nbsp; о фильме &nbsp;
                    <Link to={`/movies/${review.movie.id}`} className="link">{review.movie.title}</Link>
                  </Text>

                </ReviewMeta>

              </ReviewHeading>
              <Text variant="paragraph">{review.content}</Text>
            </>
          )}
      </Container>
    </Base >
  );
};

export default SingleReview;
