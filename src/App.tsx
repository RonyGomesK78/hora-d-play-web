
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Game from './pages/Game';
import Games from './pages/Results';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Games />} />
        <Route path="/game/:id" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
