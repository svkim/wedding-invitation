import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from './components/Main';

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="*" element={<Navigate to="/main" />} />
    </Routes>
  );
}

export default App;
