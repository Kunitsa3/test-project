import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartPicture from '../../assets/icons/CartPicture';
import Cart from '../../Cart';
import { changeBackgroundColor } from '../../store';
import ProductsCounter from './ProductsCounter';
import './style.css';

const HeaderCart = () => {
  const [isShortCartOpened, setShortCartOpened] = useState(false);
  const backgroundColor = useSelector(state => state.backgroundColor);
  const dispatch = useDispatch();

  const onShirtCartClick = () => {
    setShortCartOpened(oldState => !oldState);
    dispatch(changeBackgroundColor(!backgroundColor));
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
