import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import Base from '../layouts/base';
import Text from '../components/text/text';
import Input from '../components/form/input';
import { Container, Row } from '../components/grid';
import { getReviewById, getCommentsByReview } from '../services/slices/single-review';
import { useAppSelector, useAppDispatch } from '../services/store';
import Skeleton from '../components/skeleton/skeleton';
import Avatar from '../components/avatar/avatar';
import Button from '../components/button/button';
import CommentIcon from '../icons/comment';
import HeartIcon from '../icons/heart';
import CrossOutIcon from '../icons/cross-out';
import LockerIcon from '../icons/locker';
import { TComment } from '../services/api';

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
    transition: .2s border-color ease;
    &:hover {
      border-color: ${theme.colors.white.base};
    }
  `}
`;

const Toolbar = styled.div`
  ${({ theme }) => `
    position: absolute;
    top: 40px;
    right: 40px;
    transition: .3s transform ease .1s;

    &.toolbar-enter {
      transform: translateX(400px);
    }

    &.toolbar-enter-active {
      transform: translateX(0);
    }

    &.toolbar-exit {
      transform: translateX(0);
    }

    &.toolbar-exit-active {
      transform: translateX(400px);
    }
  `}
`;

const Counter = styled.div`
  ${({ theme }) => `
    position: absolute;
    top: -10px;
    right: -10px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    height: 20px;
    min-width: 20px;
    border-radius: 50%;
    border: 1px solid ${theme.borderColor};
    background-color: ${theme.colors.background.base};
    transition: .2s border-color ease;
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
    transition: .2s border-color ease;
    &:hover {
      &, ${Counter} {
        border-color: ${theme.colors.white.base};
      }
    }
  `}
`;

const StyledBase = styled(Base) <{ isSidebarOpen?: boolean }>`
  ${({ isSidebarOpen = false }) => `
    position: relative;
    padding-right: ${isSidebarOpen ? '380px' : '0'};
    transition: .2s padding ease;
  `}
`;

const StyledSidebar = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 380px;
    padding: ${theme.spaces[8]}px;
    border-left: 1px solid ${theme.borderColor};
    transition: .2s transform ease .1s;

    &.sidebar-enter {
      transform: translateX(400px);
    }

    &.sidebar-enter-active {
      transform: translateX(0);
    }

    &.sidebar-exit {
      transform: translateX(0);
    }

    &.sidebar-exit-active {
      transform: translateX(400px);
    }
  `}
`;

type TSidebarProps = {
  isSidebarOpen?: boolean;
  onCloseClick: () => void;
};

const StyledPlaceholder = styled.div`
  ${({ theme }) => `
    padding: ${theme.spaces[8]}px;
    border-radius: 3px;
    background-color: ${theme.colors.background.lightest};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  `}
`;

const StyledCircle = styled.div`
  ${({ theme }) => `
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.background.base};
  `}
`;

const Placeholder: React.FC = () => (
  <StyledPlaceholder>
    <StyledCircle className="mb-4" >
      <LockerIcon width="18" height="18" />
    </StyledCircle>
    <span>
      <Link className="link" to="/login">Войдите</Link> или <Link className="link" to="/register">зарегистрируйтесь</Link>, чтобы оставлять комментарии
    </span>
  </StyledPlaceholder>
);


type TCommentRowProps = {
  comment: TComment;
};

const StyledCommentRow = styled.div`
  ${({ theme }) => `
    display: flex;
    margin-bottom: ${theme.spaces[3]}px;
    ${Avatar} img {
      margin-right: 10px;
    }
  `}
`;

const CommentMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentRow: React.FC<TCommentRowProps> = ({
  comment
}) => {
  return (
    <StyledCommentRow>
      <Avatar user={comment.author} size="32px" />
      <CommentMeta>
        <Text variant="display3" className="mb-1">{comment.author.name}</Text>
        <Text variant="paragraph">{comment.content}</Text>
      </CommentMeta>
    </StyledCommentRow>
  );
};

const SidebarInner = styled.div`
  ${({ theme }) => `
    margin-top: ${theme.spaces[5]}px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  `}
`;

const Sidebar: React.FC<TSidebarProps> = ({
  isSidebarOpen = false,
  onCloseClick
}) => {
  const dispatch = useAppDispatch();
  const { reviewId } = useParams<{ reviewId: string }>();
  const { user, comments } = useAppSelector((store) => ({
    user: store.user,
    comments: store.singleReview.comments
  }));

  useEffect(() => {
    dispatch(getCommentsByReview(+reviewId));
  }, [])

  return (
    <CSSTransition
      in={isSidebarOpen}
      timeout={300}
      classNames="sidebar"
      unmountOnExit
    >
      <StyledSidebar>
        <CloseSidebar onClick={onCloseClick}>
          <CrossOutIcon width="14" height="14" />
        </CloseSidebar>
        <Text variant="h5">Комментарии</Text>
        {
          user
            ? (
              <>
                <Input name="content" type="text" rows={3} placeholder="Текст" className="mb-2" />
                <div className="d-flex">
                  <Button className="ml-auto">Отправить</Button>
                </div>
              </>
            )
            : <Placeholder />
        }
        <SidebarInner>
          {
            comments.items.map((comment) => (
              <CommentRow comment={comment} />
            ))
          }
        </SidebarInner>
      </StyledSidebar>
    </CSSTransition>
  );
};

const SingleReview: React.FC = () => {
  const dispatch = useAppDispatch();
  const { reviewId } = useParams<{ reviewId: string }>();
  const { review, isLoading } = useAppSelector((store) => store.singleReview);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(getReviewById(+reviewId));
  }, []);

  return (
    <StyledBase isSidebarOpen={isSidebarOpen}>
      <Container size="sm" className="pt-10">
        {
          isLoading
            ? <SingleReviewSkeleton />
            : review && (
              <>
                <ReviewHeading>
                  <Avatar user={review.author} className="mr-4" />
                  <ReviewMeta>
                    <Text variant="h5" className="mb-0">
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
            )
        }
      </Container>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        onCloseClick={() => setIsSidebarOpen(false)}
      />
      {
        review && (
          <CSSTransition
            in={!isSidebarOpen}
            timeout={400}
            classNames="toolbar"
            unmountOnExit
          >
            <Toolbar>
              <ToolbarBtn onClick={() => null} className="mb-5">
                <HeartIcon width="16" height="16" />
                {
                  review.likesCount && (
                    <Counter>{review.likesCount}</Counter>
                  )
                }
              </ToolbarBtn>
              <ToolbarBtn onClick={() => setIsSidebarOpen(true)}>
                <CommentIcon width="16" height="16" />
                {
                  review.commentsCount && (
                    <Counter>{review.commentsCount}</Counter>
                  )
                }
              </ToolbarBtn>
            </Toolbar>
          </CSSTransition>
        )
      }
    </StyledBase>
  );
};

export default SingleReview;
