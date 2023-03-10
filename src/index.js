import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App/App';
import { ThemeProvider } from 'styled-components';
import {theme} from 'constants/theme';
import { GlobalStyle } from 'components/GlobalStyle/';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
    <App />
    </ThemeProvider>
  </React.StrictMode>
);
