/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { gql, useQuery } from '@apollo/client';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import AttributeButton from '../components/AttributeButton';
import { addProductInCart, Product, useAppSelector } from '../store';
import './style.css';

const PRODUCT_DETAILS = gql`
  query ($id: String!) {
    product(id: $id) {
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
      brand
      description
    }
  }
`;

interface ProductRequest {
  product: Product;
}

const ProductCardItemPage: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useQuery<ProductRequest>(PRODUCT_DETAILS, { variables: { id } });
  const productDetails = data?.product;
  const currency = useAppSelector(state => state.appConfigurations.currency);
  const attributes = productDetails?.attributes[0].items;
  const price = productDetails?.prices.find(element => element.currency.label === currency.label);
  const [mainPhoto, setMainPhoto] = useState<string>();
  const [selectedAttribute, setSelectedAttribute] = useState<string | undefined>();

  useEffect(() => {
    if (data) setMainPhoto(productDetails?.gallery[0]);
  }, [data]);

  const onPhotoClick = (src: string): void => {
    setMainPhoto(src);
  };

  const onAttributeClick = (attribute: string | undefined): void => {
    setSelectedAttribute(attribute);
  };

  const onAddIntoCartButtonClick = (): void => {
    dispatch(addProductInCart({ ...productDetails, selectedAttribute }));
  };

  console.log(data);
  console.log(mainPhoto);

  return (
    <div className="product-card-item-wrapper">
      <div className="small-product-photo-wrapper">
        {data?.product.gallery.map(element => (
          <img className="small-product-photo" src={element} alt="1" onClick={(): void => onPhotoClick(element)} />
        ))}
      </div>
      <div className="main-product-information">
        <img className="active-product-photo" src={mainPhoto} alt="1" />
      </div>
      <div className="product-card-item-page-details">
        <p className="product-card-item-page-brand-name">{productDetails?.brand}</p>
        <p className="product-card-item-page-name">{productDetails?.name}</p>
        <p className="product-card-item-page-size">SIZE:</p>
        <div className="product-card-item-page-size-buttons-wrapper">
          {attributes?.map(attribute => {
            const isActive = attribute.value === selectedAttribute;

            return (
              <AttributeButton
                className="product-card-item-page-button-size"
                attribute={attribute}
                onClick={(): void => {
                  onAttributeClick(attribute.value);
                }}
                active={isActive}
              />
            );
          })}
        </div>

        <p className="product-card-item-page-price">PRICE:</p>
        <p className="product-card-item-page-price-amount">{currency.symbol + (price?.amount || 0)}</p>
        <button
          className="product-card-item-page-button"
          type="button"
          onClick={(): void => {
            onAddIntoCartButtonClick();
          }}
        >
          ADD TO CART
        </button>
        <p
          className="product-card-item-page-description"
          dangerouslySetInnerHTML={{ __html: productDetails?.description || '' }}
        />
      </div>
    </div>
  );
};

export default ProductCardItemPage;
