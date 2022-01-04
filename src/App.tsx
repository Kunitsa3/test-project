import { FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import Header from './Header';
import { routes } from './routing';
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
      <BrowserRouter>
        <Header />
        <Routes>
          {routes.map(route => (
            <Route {...route} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
