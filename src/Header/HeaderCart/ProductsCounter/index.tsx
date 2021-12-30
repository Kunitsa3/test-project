import clsx from 'clsx';
import { FC } from 'react';

import { useAppSelector } from '../../../store';
import './style.css';

const ProductsCounter: FC = () => {
  const cart = useAppSelector(state => state.appConfigurations.cart);

  return (
    <div className={clsx(!cart.length && 'invisible', 'products-counter-wrapper')}>
      <p className="products-in-cart-counter">{cart.length}</p>
    </div>
  );
};

export default ProductsCounter;
