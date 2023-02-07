import { createStore } from 'effector';
import { useStore } from 'effector-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/home/home';
import './app.scss';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);
