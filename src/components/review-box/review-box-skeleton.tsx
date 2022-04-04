import React from 'react';
import Skeleton from '../skeleton/skeleton';
import { Panel, PanelBody, PanelHeader, PanelFooter } from '../panel/panel';
import styled from 'styled-components';

const SkeletonAvatar = styled.div`
  display: flex;
  align-items: center;
`;

const SkeletonAuthor = styled.div`
  margin-left: 10px;
`;

const SkeletonAuthorWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SkeletonMeta = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ReviewBoxSkeleton: React.FC = () => (
  <Panel transparent>
    <PanelHeader>
      <SkeletonAuthorWrapper>
        <SkeletonAvatar>
          <Skeleton width="64px" height="64px" variant="rounded" />
        </SkeletonAvatar>
        <SkeletonAuthor>
          <Skeleton width="200px" height="14px" className="mb-2" />
          <Skeleton width="150px" height="14px" />
        </SkeletonAuthor>
      </SkeletonAuthorWrapper>
    </PanelHeader>
    <PanelBody>
      <Skeleton height="16px" width="40%" className="mb-2"/>
      <Skeleton height="100px" width="80%" variant="rectangular"/>
    </PanelBody>
    <PanelFooter>
    </PanelFooter>
  </Panel>
);

export default ReviewBoxSkeleton;
