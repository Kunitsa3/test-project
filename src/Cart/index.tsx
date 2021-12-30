import './style.css';
import { FC } from 'react';

import { Product, useAppSelector } from '../store';

import ProductInShortCart from './ProductInShortCart';

const pluralForm = (
  quantity: number,
  {
    single,
    plural,
  }: {
    single: string;
    plural: string;
  }
): string => (quantity === 1 ? single : plural);

interface CartProps {
  onClick: () => void;
}

const Cart: FC<CartProps> = ({ onClick }) => {
  const productsInCart = useAppSelector(state => state.appConfigurations.cart);
  const currency = useAppSelector(state => state.appConfigurations.currency);
  const productsInCartQuantity = productsInCart.length;
  const total = productsInCart.reduce((acc, cur) => {
    const totalPrice = acc;
    const curPrice = cur.prices.find(element => element.currency.label === currency.label)?.amount;

    return totalPrice + (curPrice || 0);
  }, 0);

  const sortedProducts = productsInCart.reduce<Record<string, Product[]>>((acc, curr) => {
    const key = curr.id + curr.selectedAttribute;
    const value = {
      ...acc,
      [key]: [...(acc[key] || []), curr],
    };

    return value;
  }, {});

  const groupedProducts = Object.values<any[]>(sortedProducts).map(el => {
    const newValue = { ...el[0], count: el.length };

    return newValue;
  });

  return (
    <div className="short-cart-wrapper">
      <p className="short-cart-products-counter">
        <b>My bag, </b> {productsInCartQuantity}{' '}
        {pluralForm(productsInCartQuantity, { single: 'item', plural: 'items' })}
      </p>
      {groupedProducts.map(product => (
        <ProductInShortCart
          productDetails={product}
          key={product.id + product.selectedAttribute}
          count={product.count}
          activeAttribute={product.selectedAttribute}
        />
      ))}
      <div className="short-cart-total-price">
        <p className="short-cart-total">Total</p>
        <p className="short-cart-price">{currency.symbol + total.toFixed(2)}</p>
      </div>
      <div className="short-cart-buttons-wrapper">
        <button className="short-cart-view-bag-button" type="button">
          VIEW BAG
        </button>
        <button className="short-cart-check-out-button" onClick={onClick} type="button">
          CHECK OUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
