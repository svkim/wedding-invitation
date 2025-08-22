import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Modal from './components/Modal';
import { useState } from 'react';
import { NavermapsProvider } from 'react-naver-maps';
import JSConfetti from 'js-confetti';
import { Analytics } from '@vercel/analytics/react';

export const jsConfetti = new JSConfetti();

function App() {


  useEffect(() => {
    // 핀치 줌 막기
    const handleTouchMove = (e) => {
      if (e.scale !== 1) {
        e.preventDefault();
      }
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // 더블탭 줌 막기
    let lastTouchEnd = 0;
    const handleTouchEnd = (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, false);

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  
  const ncpKeyId = import.meta.env.VITE_APP_NAVERMAPS_CLIENT_ID;
  const [component, setComponent] = useState<React.ReactNode>(null);

  return (
    <NavermapsProvider ncpKeyId={ncpKeyId}>
      <BrowserRouter>
        <Modal component={component} setComponent={setComponent} />
        <Main setComponent={setComponent} />
        <Analytics />
      </BrowserRouter>
    </NavermapsProvider>
  );
}

export default App;
