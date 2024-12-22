// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // Use `react-dom/client` for React 18+
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import reportWebVitals from './reportWebVitals';

// Create a root using the new `createRoot` method from ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app using the `root.render()` method
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
