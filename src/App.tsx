import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Modal from './components/Modal';
import { useState } from 'react';
import { NavermapsProvider } from 'react-naver-maps';

interface Props {
  setComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

function App() {
  const ncpClientId = import.meta.env.VITE_APP_NAVERMAPS_CLIENT_ID;
  const [component, setComponent] = useState<React.ReactNode>(null);

  return (
    <NavermapsProvider ncpClientId={ncpClientId}>
      <BrowserRouter>
        <Modal component={component} setComponent={setComponent} />
        <Layout setComponent={setComponent} />
      </BrowserRouter>
    </NavermapsProvider>
  );
}

function Layout({ setComponent }: Props) {
  return (
    <Routes>
      <Route path="/main" element={<Main setComponent={setComponent} />} />
      <Route path="*" element={<Navigate to="/main" />} />
    </Routes>
  );
}

export default App;
