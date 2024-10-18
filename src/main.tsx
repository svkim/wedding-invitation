import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// import Snowfall from 'react-snowfall';

// const image = document.createElement('img');
// image.src = '../public/main.jpg';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Snowfall
      color="white"
      snowflakeCount={30}
      radius={[0.5, 1.2]}
      // images={[image]}
      speed={[0.2, 1]}
    /> */}
    <App />
  </StrictMode>
);
