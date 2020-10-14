import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';

import { useChangeTheme } from './hooks';

import GlobalStyles from './styles/GlobalStyles';
import './styles/ReactToastify.css';

const App: React.FC = () => {
  const { currentTheme } = useChangeTheme();

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={currentTheme}>
          <ToastContainer />
          <GlobalStyles />
          <Routes />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
