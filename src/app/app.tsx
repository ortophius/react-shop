import { CartPage } from '@/pages/cart/page';
import { CategoryPage } from '@/pages/category';
import { OrderPage } from '@/pages/order';
import { ProductPage } from '@/pages/product';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/home/home';
import { paths } from '../shared/lib/config/paths';
import { YMaps } from '@pbe/react-yandex-maps';
import './app.scss';

export const App = () => (
  <YMaps>
    <BrowserRouter>
      <Routes>
        <Route path={paths.home()} element={<HomePage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </BrowserRouter>
  </YMaps>
);
