import styled from 'styled-components';
import { useHistory, useLocation, Link } from 'react-router-dom';
import Text from '../text/text';
import Heart from '../../icons/heart';
import Star from '../../icons/star';
import ReadMore from '../read-more/read-more';
import CommentIcon from '../../icons/comment';
import UserProfile from '../user-profile/user-profile';
import Avatar from '../avatar/avatar';
import { TReview } from '../../services/api';
import {
  PanelFooter,
  Panel,
  PanelHeader,
  PanelBody
} from '../panel/panel';
import formatDate from '../../utils/format-date';
import { addLike } from '../../services/slices/movie';
import { useAppDispatch, useAppSelector } from '../../services/store';

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

const StarIcon = styled(Star).attrs(() => ({ width: '20', height: '20' }))`
  margin-top: -1px;
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.primary.base};
`;

const ReviewMetaWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 16px;
  svg {
    margin-right: 8px;
  }
`;

const StyledCount = styled.div`
  line-height: 1;
`;

type TReviewMetaBtnProps = {
  className?: string;
  icon: React.ReactNode;
  count?: number;
};

const ReviewMetaBtn: React.FC<TReviewMetaBtnProps> = ({
  icon,
  className,
  count = 0
}) => {
  return (
    <ReviewMetaWrapper
      className={className}
    >
      {icon}
      <StyledCount>
        {count > 0 && count}
      </StyledCount>
    </ReviewMetaWrapper>
  );
};

const StyledReviewLikeBtn = styled.div<{ active?: boolean }>`
  ${({ active, theme }) => active && `color: ${theme.colors.danger.base}`};
`;

const ReviewLink = styled(Link)`
  ${({ theme }) => `
    &:hover {
      color: ${theme.colors.primary.base};
    }
  `}
`;

type TReviewLikeBtn = {
  active?: boolean;
  count?: number;
  onClick?: () => void;
};

const ReviewLikeBtn: React.FC<TReviewLikeBtn> = ({
  active = false,
  count,
  onClick
}) => {
  return (
    <StyledReviewLikeBtn
      active={active}
      onClick={onClick}
    >
      <ReviewMetaBtn icon={<Heart active={active} width="16" height="16" />} count={count} />
    </StyledReviewLikeBtn>
  );
};

type TReviewBoxProps = {
  review: TReview;
  last?: boolean;
};

const ReviewBox: React.FC<TReviewBoxProps> = ({
  review: {
    id,
    author,
    rating,
    createdAt,
    title,
    content,
    movieId,
    liked,
    likesCount
  },
  last = false
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.user);

  const history = useHistory();
  const location = useLocation();

  const onLikeClick = () => {
    if (!user) {
      history.push({
        pathname: '/login',
        state: { from: location }
      });
      return;
    }
    dispatch(addLike(id));
  };

  return (
    <Panel className={!last ? 'mb-5' : ''}>
      <PanelHeader>
        <Avatar user={author} />
        <UserProfile
          name={author.name}
          reviewsCount={author.reviewsCount}
        />
        <ReviewMeta>
          <ReviewRating>{rating}/10<StarIcon /></ReviewRating>
          <ReviewDate>{formatDate(createdAt)}</ReviewDate>
        </ReviewMeta>
      </PanelHeader>
      <PanelBody>
        <ReviewLink to={`/movies/${movieId}/reviews/${id}`}>
          <Text variant="h4">{title}</Text>
        </ReviewLink>
        <ReadMore text={content} />
      </PanelBody>
      <PanelFooter>
        <ReviewLikeBtn
          onClick={onLikeClick}
          active={liked}
          count={likesCount}
        />
        <ReviewMetaBtn icon={<CommentIcon width="16" height="16" />} />
      </PanelFooter>
    </Panel>
  );
};

export default ReviewBox;
