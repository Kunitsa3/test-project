import './style.css';

import { useQuery, gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { changeProductsCategories } from '../../store';

const PRODUCT_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

const CategoryName = () => {
  const { loading, error, data } = useQuery(PRODUCT_CATEGORIES);
  const dispatch = useDispatch();
  const onProductCategoryClick = productCategory => {
    dispatch(changeProductsCategories(productCategory));
  };
  const currentProductCategory = useSelector(state => state.appConfigurations.productsCategory);

  return (
    <div className="category-names-wrapper">
      {data?.categories.map((element, elementIndex) => (
        <p
          className={
            currentProductCategory === element.name ? 'active-category-name category-name-item' : 'category-name-item'
          }
          key={elementIndex}
          onClick={() => onProductCategoryClick(element.name)}
        >
          {element.name.toUpperCase()}
        </p>
      ))}
    </div>
  );
};

export default CategoryName;
