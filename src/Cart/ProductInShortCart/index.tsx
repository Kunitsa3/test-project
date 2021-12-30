import { FC } from 'react';
import { useDispatch } from 'react-redux';

import AttributeButton from '../../components/AttributeButton';
import { SquareButton } from '../../components/buttons';
import { addProductInCart, deleteProductFromCart, useAppSelector, Product } from '../../store';
import './style.css';

interface ProductInShortCartProps {
  count: number;
  activeAttribute: string | undefined;
  productDetails: Product;
}

const ProductInShortCart: FC<ProductInShortCartProps> = ({ count, activeAttribute, productDetails }) => {
  const currency = useAppSelector(state => state.appConfigurations.currency);
  const productPrice = productDetails.prices.find(element => element.currency.label === currency.label);
  const productAttributes = productDetails.attributes[0]?.items;
  const dispatch = useDispatch();

  const onIncreaseButtonClick = (product: Product): void => {
    dispatch(addProductInCart(product));
  };

  const onDecreaseButtonClick = (product: Product): void => {
    dispatch(deleteProductFromCart(product));
  };

  return (
    <div className="product-in-short-cart-wrapper">
      <div className="product-short-cart-details">
        <div>
          <p className="product-in-short-cart-name">{productDetails.name}</p>
          <p className="product-short-cart-price">
            {(productPrice?.currency?.symbol || '$') + (productPrice?.amount || 0)}
          </p>
        </div>
        <div className="product-size-button-wrapper">
          {productAttributes?.map((attribute, index) => {
            const isDisabled = activeAttribute !== attribute.value;

            return <AttributeButton disabled={isDisabled} attribute={attribute} key={index} />;
          })}
        </div>
      </div>
      <div className="product-in-short-cart-details">
        <div className="products-counter">
          <SquareButton disabled={false} onClick={() => onIncreaseButtonClick(productDetails)}>
            +
          </SquareButton>
          <p>{count}</p>
          <SquareButton disabled={false} onClick={() => onDecreaseButtonClick(productDetails)}>
            -
          </SquareButton>
        </div>
        <div className="image-wrapper">
          <img className="product-in-short-list-photo" src={productDetails.gallery[0]} alt="Ничего не получилось" />
        </div>
      </div>
    </div>
  );
};

export default ProductInShortCart;
