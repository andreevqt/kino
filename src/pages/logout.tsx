import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../services/slices/user';
import { useAppDispatch, useAppSelector } from '../services/store';

const Logout = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logout(() => history.replace({ pathname: '/' })));
  }, []);

  return null;
};

export default Logout;
