import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import CartIcon from '../../assets/icons/CartIcon';
import AttributeButton from '../../components/AttributeButton';
import { addProductInCart, useAppSelector, Product } from '../../store';
import './style.css';

interface ProductCardItemProps {
  productDetails: Product;
}

const ProductCardItem: FC<ProductCardItemProps> = ({ productDetails }) => {
  const currency = useAppSelector(state => state.appConfigurations.currency);
  const clothesPrice = productDetails.prices.find(element => element.currency.label === currency.label);
  const productAttributes = productDetails.attributes[0]?.items;
  const attributesPresence = productDetails.attributes[0];

  const [selectedAttribute, setSelectedAttribute] = useState<string | undefined>();

  const onAttributeButtonClick = (value: string | undefined): void => {
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
          <p className="product-price">{(clothesPrice?.currency.symbol || '$') + (clothesPrice?.amount || 0)}</p>
        </div>
        <div className="product-card-attributes">
          {productAttributes?.map((attribute, index) => {
            const isActive = attribute.value === selectedAttribute;

            return (
              <AttributeButton
                key={index}
                onClick={() => onAttributeButtonClick(attribute.value)}
                attribute={attribute}
                active={isActive}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductCardItem;
