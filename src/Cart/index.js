import './style.css';
import ProductInShortCart from './ProductInShortCart';
import { useSelector } from 'react-redux';

const pluralForm = (quantity, { single, plural }) => {
  return quantity === 1 ? single : plural;
};

const Cart = ({ onClick }) => {
  const productsInCart = useSelector(state => state.appConfigurations.cart);
  const currency = useSelector(state => state.appConfigurations.currency);
  const productsInCartQuantity = productsInCart.length;
  const total = productsInCart.reduce((acc, cur) => {
    const total = acc;
    const curPrice = cur.prices.find(element => element.currency.label === currency).amount;
    return total + curPrice;
  }, 0);

  const sortedProducts = productsInCart.reduce((acc, curr) => {
    const key = curr.id + curr.selectedAttribute;
    const value = {
      ...acc,
      [key]: [...(acc[key] || []), curr],
    };

    return value;
  }, {});

  const groupedProducts = Object.values(sortedProducts).map(el => {
    const newValue = { ...el[0], count: el.length };
    return newValue;
  });

  return (
    <div className="short-cart-wrapper">
      <p className="short-cart-products-counter">
        <b>My bag, </b> {productsInCartQuantity}{' '}
        {pluralForm(productsInCartQuantity, { single: 'item', plural: 'items' })}
      </p>
      {groupedProducts.map(product => {
        const productPrice = product.prices.find(element => element.currency.label === currency);
        const productAttributes = product.attributes[0]?.items;
        return (
          <ProductInShortCart
            name={product.name}
            key={product.id + product.selectedAttribute}
            price={productPrice.currency.symbol + productPrice.amount}
            attributes={productAttributes}
            photo={product.gallery[0]}
            count={product.count}
            activeAttribute={product.selectedAttribute}
          />
        );
      })}
      <div className="short-cart-total-price">
        <p className="short-cart-total">Total</p>
        <p className="short-cart-price">{total}</p>
      </div>
      <div className="short-cart-buttons-wrapper">
        <button className="short-cart-view-bag-button">VIEW BAG</button>
        <button className="short-cart-check-out-button" onClick={onClick}>
          CHECK OUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
