import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalStyle, ThemeProvider } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getUser } from '../../services/slices/user';
import { setError } from '../../services/slices/common';
import Popup from '../popup/popup';
import CustomSwitch from '../custom-switch/custom-switch';

const App = () => {
  const lastErr = useAppSelector((store) => store.common.lastErr);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Router>
        <CustomSwitch />
      </Router>
      {
        lastErr && (
          <Popup
            onClick={() => dispatch(setError(null))}
          >
            {lastErr}
          </Popup>
        )
      }
    </ThemeProvider >
  );
};

export default App;
