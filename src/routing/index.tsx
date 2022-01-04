import ProductCard from '../ProductCard';
import ProductCardItemPage from '../ProductCardItemPage';

export const routes = [
  {
    path: '/productCard',
    element: <ProductCard />,
    exact: true,
    key: '1',
  },
  {
    path: '/productCardItemPage/:id',
    element: <ProductCardItemPage />,
    exact: true,
    key: '2',
  },

  {
    path: '/*',
    element: <ProductCard />,
    key: '3',
  },
];
