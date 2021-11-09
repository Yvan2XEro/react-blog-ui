import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import PostsPage from './pages/PostsPage';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={ <LoginPage /> } />
      <Route path="/blog" element={ <PostsPage /> } />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
