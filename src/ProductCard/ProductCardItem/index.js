import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartIcon from '../../assets/icons/CartIcon';
import { SquareButton } from '../../components/buttons';
import { addProductInCart } from '../../store';
import './style.css';

const ProductCardItem = ({ productDetails }) => {
  const currency = useSelector(state => state.appConfigurations.currency);
  const clothesPrice = productDetails.prices.find(element => element.currency.label === currency);
  const productAttributes = productDetails.attributes[0]?.items;
  const attributesPresence = productDetails.attributes[0];

  const [selectedAttribute, setSelectedAttribute] = useState();
  const onAttributeButtonClick = value => {
    setSelectedAttribute(value);
  };

  const dispatch = useDispatch();
  const onCartIconClick = () => {
    dispatch(addProductInCart({ ...productDetails, selectedAttribute }));
  };

  return (
    <div className="product-card-item">
      <div className="cart-item-picture-wrapper">
        <img src={productDetails.gallery[0]} alt="Ничего не получилось" className="product-item-photo" />
        {attributesPresence ? (
          selectedAttribute && (
            <div onClick={onCartIconClick}>
              <CartIcon className="cart-icon-picture" />
            </div>
          )
        ) : (
          <div onClick={onCartIconClick}>
            <CartIcon className="cart-icon-picture" />
          </div>
        )}
      </div>
      <div className="product-card-details">
        <div>
          <p className="product-name">{productDetails.name}</p>
          <p className="product-price">{clothesPrice.currency.symbol + clothesPrice.amount}</p>
        </div>
        <div className="product-card-attributes">
          {productAttributes?.map((element, index) => {
            return (
              <SquareButton
                disabled={false}
                onClick={() => onAttributeButtonClick(element.value)}
                key={index}
                active={element.value === selectedAttribute}
              >
                {element.value}
              </SquareButton>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductCardItem;
