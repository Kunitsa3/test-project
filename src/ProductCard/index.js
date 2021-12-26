import ProductCardItem from './ProductCardItem';
import './style.css';
import { useQuery, gql } from '@apollo/client';
import { useSelector } from 'react-redux';

const PRODUCT_DETAILS = gql`
  query {
    categories {
      name
      products {
        id
        name
        inStock
        attributes {
          items {
            value
            displayValue
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        gallery
      }
    }
  }
`;

const ProductCard = () => {
  const { loading, error, data } = useQuery(PRODUCT_DETAILS);
  const currentProductCategory = useSelector(state => state.appConfigurations.productsCategory);
  console.log(data);

  const clothesData = data?.categories.find(element => element.name === currentProductCategory).products;

  return (
    <div className="product-card-wrapper">
      <p className="product-card-title-wrapper">
        {currentProductCategory[0].toUpperCase() + currentProductCategory.slice(1)}
      </p>
      <div className="product-card-items-wrapper">
        {clothesData?.map((element, index) => {
          return <ProductCardItem productDetails={element} key={element.id} />;
        })}
      </div>
    </div>
  );
};

export default ProductCard;
