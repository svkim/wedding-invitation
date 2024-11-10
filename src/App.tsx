import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Modal from './components/Modal';
import { useState } from 'react';

interface Props {
  setComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

function App() {
  const [component, setComponent] = useState<React.ReactNode>(null);

  return (
    <BrowserRouter>
      <Modal component={component} setComponent={setComponent} />
      <Layout setComponent={setComponent} />
    </BrowserRouter>
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
