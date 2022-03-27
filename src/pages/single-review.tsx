import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Base from '../layouts/base';
import Text from '../components/text/text';
import { Container, Row } from '../components/grid';
import { get } from '../services/slices/single-review';
import { useAppSelector, useAppDispatch } from '../services/store';
import Skeleton from '../components/skeleton/skeleton';
import Avatar from '../components/avatar/avatar';
import CommentIcon from '../icons/comment';
import CrossOut from '../icons/cross-out';

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

const CloseSidebar = styled.div`
  ${({ theme }) => `
    cursor: pointer;
    position: absolute;
    left: -14px;
    top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.background.base};
    border: 1px solid ${theme.borderColor};
    border-radius: 50%;
    width: 28px;
    height: 28px;
  `}
`;

const Toolbar = styled.div<{ isSidebarOpen?: boolean }>`
  ${({ theme, isSidebarOpen = false }) => `
    position: fixed;
    top: 100px;
    right: 40px;
    transition: .2s transform ease .4s;
    transform: translateX( ${isSidebarOpen ? '380px' : '0'});
  `}
`;

const ToolbarBtn = styled.div`
  ${({ theme, }) => `
    position: relative;
    cursor: pointer;
    font-size: 0;
    border-radius: 3px;
    padding: ${theme.spaces[3]}px;
    border: 1px solid ${theme.borderColor};
  `}
`;

const Counter = styled.div`
  ${({ theme }) => `
    position: absolute;
    top: -6px;
    right: -6px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 1px solid ${theme.borderColor};
  `}  
`;

const StyledBase = styled(Base) <{ isSidebarOpen?: boolean }>`
  ${({ isSidebarOpen = false }) => `
    position: relative;
    padding-right: ${isSidebarOpen ? '380px' : '0'};
    transition: .2s padding ease;
  `}
`;

const Sidebar = styled.div<{ isSidebarOpen?: boolean }>`
  ${({ theme, isSidebarOpen = false }) => `
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 380px;
    border-left: 1px solid ${theme.borderColor};
    transition: .2s transform ease;
    transform: translateX( ${isSidebarOpen ? '0' : '400px'});
  `}
`;

const SingleReview: React.FC = () => {
  const dispatch = useAppDispatch();
  const { reviewId } = useParams<{ reviewId: string }>();
  const { review, isLoading } = useAppSelector((store) => store.singleReview);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const onCommentClick = () => setIsSidebarOpen(true);
  const onCloseClick = () => setIsSidebarOpen(false);

  useEffect(() => {
    dispatch(get(+reviewId));
  }, []);

  return (
    <StyledBase isSidebarOpen={isSidebarOpen}>
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
      <Sidebar isSidebarOpen={isSidebarOpen}>
        <CloseSidebar onClick={onCloseClick}>
          <CrossOut width="14" height="14" />
        </CloseSidebar>
      </Sidebar>
      <Toolbar isSidebarOpen={isSidebarOpen}>
        <ToolbarBtn onClick={onCommentClick}>
          <CommentIcon width="16" height="16" />
          <Counter>2</Counter>
        </ToolbarBtn>
      </Toolbar>
    </StyledBase>
  );
};

export default SingleReview;
