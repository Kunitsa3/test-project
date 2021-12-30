import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import CartPicture from '../../assets/icons/CartPicture';
import Cart from '../../Cart';
import { changeBackgroundColor } from '../../store';

import ProductsCounter from './ProductsCounter';
import './style.css';

const HeaderCart: FC = () => {
  const [isShortCartOpened, setShortCartOpened] = useState(false);
  const dispatch = useDispatch();

  const onShirtCartClick = (): void => {
    setShortCartOpened(oldState => !oldState);
    dispatch(changeBackgroundColor());
  };

  return (
    <div className="header-cart-wrapper">
      <div className="cart-picture-wrapper" onClick={onShirtCartClick}>
        <CartPicture />
        <ProductsCounter />
      </div>

      {isShortCartOpened && <Cart onClick={onShirtCartClick} />}
    </div>
  );
};

export default HeaderCart;
