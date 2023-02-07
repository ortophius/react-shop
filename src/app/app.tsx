import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/home/home';
import { paths } from '../shared/lib/config/paths';
import './app.scss';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={paths.home()} element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);
