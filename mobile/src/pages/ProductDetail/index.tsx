import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { Product } from '../ProductList';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  EditProductButton,
  ProductContainer,
  ProductName,
  ProductDescription,
  ProductInfoContainer,
  ProductInfoLabel,
  ProductInfo,
} from './styles';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';
import compareDate from '../../utils/compareDate';

interface Params {
  productId: string;
}

export interface ProductParams {
  id: string;
  name: string;
  description: string;
  category: string;
  amount: number;
  price: number;
}

const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState({} as Product);
  const [productParams, setProductParams] = useState({} as ProductParams);

  const { navigate, goBack } = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadProduct(): Promise<void> {
      await api.get(`/products/${routeParams.productId}`).then((response) => {
        const productData = response.data[0];

        setProduct({
          ...productData,
          formattedPrice: formatValue(productData.price),
          formattedCreatedDate: formatDate(productData.created_at),
          formattedUpdatedDate: compareDate(
            productData.created_at,
            productData.updated_at,
          )
            ? formatDate(productData.updated_at)
            : 'Not updated yet',
        });
      });
    }

    loadProduct();
  }, [routeParams]);

  useEffect(() => {
    setProductParams({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      amount: product.amount,
      price: product.price,
    });
  }, [product]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const navigateToEditProduct = useCallback(
    (productParams: ProductParams) => {
      navigate('EditProduct', { productParams });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigateBack()}>
          <Feather name="arrow-left" size={22} color="#f4ede8" />
        </BackButton>
        <HeaderTitle>Product Details</HeaderTitle>
        <EditProductButton onPress={() => navigateToEditProduct(productParams)}>
          <Feather name="edit" size={22} color="#f4ede8" />
        </EditProductButton>
      </Header>
      <ProductContainer>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>
          Description: {'\n'}
          {product.description}
        </ProductDescription>
        <ProductInfoContainer>
          <ProductInfoLabel>Category:</ProductInfoLabel>
          <ProductInfo>{product.category}</ProductInfo>
        </ProductInfoContainer>
        <ProductInfoContainer>
          <ProductInfoLabel>Price:</ProductInfoLabel>
          <ProductInfo>{product.formattedPrice}</ProductInfo>
        </ProductInfoContainer>
        <ProductInfoContainer>
          <ProductInfoLabel>Amount:</ProductInfoLabel>
          <ProductInfo>{product.amount} items</ProductInfo>
        </ProductInfoContainer>
        <ProductInfoContainer>
          <ProductInfoLabel>Created at:</ProductInfoLabel>
          <ProductInfo>{product.formattedCreatedDate}</ProductInfo>
        </ProductInfoContainer>
        <ProductInfoContainer>
          <ProductInfoLabel>Updated at:</ProductInfoLabel>
          <ProductInfo>{product.formattedUpdatedDate}</ProductInfo>
        </ProductInfoContainer>
      </ProductContainer>
    </Container>
  );
};

export default ProductDetail;
