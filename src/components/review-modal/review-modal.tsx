import React from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '../modal/modal';
import CreateReview from '../create-revew/create-review';

const ReviewModal: React.FC = () => {
  const history = useHistory();
  const onClose = () => history.goBack();

  return (
    <Modal onClose={onClose}>
      <CreateReview />
    </Modal>
  );
};

export default ReviewModal;
