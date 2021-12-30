/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './style.css';

import { useQuery, gql } from '@apollo/client';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { changeProductsCategories, useAppSelector } from '../../store';

const PRODUCT_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

interface CategoriesRequest {
  categories: { name: string }[];
}

const CategoryName: FC = () => {
  const { data } = useQuery<CategoriesRequest>(PRODUCT_CATEGORIES);
  const dispatch = useDispatch();

  const onProductCategoryClick = (productCategory: string): void => {
    dispatch(changeProductsCategories(productCategory));
  };

  const currentProductCategory = useAppSelector(state => state.appConfigurations.productsCategory);

  return (
    <div className="category-names-wrapper">
      {data?.categories.map((element, elementIndex) => (
        <p
          className={
            currentProductCategory === element.name ? 'active-category-name category-name-item' : 'category-name-item'
          }
          key={elementIndex}
          onClick={(): void => onProductCategoryClick(element.name)}
        >
          {element.name.toUpperCase()}
        </p>
      ))}
    </div>
  );
};

export default CategoryName;
