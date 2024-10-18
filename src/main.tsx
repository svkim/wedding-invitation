import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// import Snowfall from 'react-snowfall';

// const image = document.createElement('img');
// image.src = '../public/main.jpg';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
