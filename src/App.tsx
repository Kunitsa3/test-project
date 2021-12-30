import { FC, useEffect } from 'react';

import './App.css';
import Header from './Header';
import ProductCard from './ProductCard';
import { useAppSelector } from './store';

const App: FC = () => {
  const darkBackground = useAppSelector(state => state.appConfigurations.darkBackground);
  const cart = useAppSelector(state => state.appConfigurations.cart);
  useEffect(() => {
    localStorage.setItem('productsInCart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="App">
      {darkBackground && <div className="dark-background" />}
      <Header />
      <ProductCard />
    </div>
  );
};

export default App;
