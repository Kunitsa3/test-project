import { SquareButton } from '../../components/buttons';
import './style.css';
const ProductInShortCart = ({ name, price, photo, attributes, count, activeAttribute }) => {
  return (
    <div className="product-in-short-cart-wrapper">
      <div className="product-short-cart-details">
        <div>
          <p className="product-in-short-cart-name">{name}</p>
          <p className="product-short-cart-price">{price}</p>
        </div>
        <div className="product-size-button-wrapper">
          {attributes?.map((element, index) => {
            return (
              <SquareButton disabled={false} key={index} active={activeAttribute === element.value}>
                {element.value}
              </SquareButton>
            );
          })}
        </div>
      </div>
      <div className="product-in-short-cart-details">
        <div className="products-counter">
          <SquareButton disabled={false}>+</SquareButton>
          <p>{count}</p>
          <SquareButton disabled={false}>-</SquareButton>
        </div>
        <div className="image-wrapper">
          <img className="product-in-short-list-photo" src={photo} alt="Ничего не получилось"></img>
        </div>
      </div>
    </div>
  );
};
export default ProductInShortCart;
