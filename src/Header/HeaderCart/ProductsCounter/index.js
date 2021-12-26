import clsx from 'clsx';
import { useSelector } from 'react-redux';
import './style.css';

const ProductsCounter = () => {
  const cart = useSelector(state => state.appConfigurations.cart);
  return (
    <div className={clsx(!cart.length && 'invisible', 'products-counter-wrapper')}>
      <p className="products-in-cart-counter">{cart.length}</p>
    </div>
  );
};

export default ProductsCounter;
