import React from 'react';
import { Container } from '../components/grid';
import OneCol from '../layouts/one-col';
import CreateReviewComponent from '../components/create-revew/create-review';

const CreateReview: React.FC = () => {
  return (
    <OneCol>
      <CreateReviewComponent />
    </OneCol>
  );
};


export default CreateReview;
