import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Home, Movie, Login, Logout, Register, CreateReview } from '../../pages';
import { TLocationState } from '../../types/common';
import ProtectedRoute from '../protected-route/protected-route';
import ReviewModal from '../review-modal/review-modal';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import Review from '../../pages/review';

const CustomSwitch: React.FC = () => {
  const location = useLocation<TLocationState>();
  const background = location.state && location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/logout" exact>
          <Logout />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/movies/:movieId" exact>
          <ScrollToTop />
          <Movie />
        </Route>
        <ProtectedRoute path="/movies/:movieId/reviews/add" exact>
          <CreateReview />
        </ProtectedRoute>
        <Route path="/movies/:movieId/reviews/:reviewId" exact>
          <Review />
        </Route>
      </Switch>
      {
        background && (
          <ProtectedRoute path="/movies/:movieId/reviews/add" exact>
            <ReviewModal />
          </ProtectedRoute>
        )
      }
    </>
  )
};

export default CustomSwitch;
