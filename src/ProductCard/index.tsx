import './style.css';
import { useQuery, gql } from '@apollo/client';
import { FC } from 'react';

import { useAppSelector, Product } from '../store';

import ProductCardItem from './ProductCardItem';

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

interface ProductsRequest {
  categories: { name: string; products: Product[] }[];
}

const ProductCard: FC = () => {
  const { data } = useQuery<ProductsRequest>(PRODUCT_DETAILS);
  const currentProductCategory = useAppSelector(state => state.appConfigurations.productsCategory);

  const clothesData = data?.categories?.find(element => element.name === currentProductCategory)?.products;

  return (
    <div className="product-card-wrapper">
      <p className="product-card-title-wrapper">
        {currentProductCategory[0].toUpperCase() + currentProductCategory.slice(1)}
      </p>
      <div className="product-card-items-wrapper">
        {clothesData?.map(element => (
          <ProductCardItem productDetails={element} key={element.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
