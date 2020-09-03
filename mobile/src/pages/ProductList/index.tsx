import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import {
  Container,
  Header,
  CommonHeaderButton,
  HeaderTitle,
  AddProductButton,
  ProductsListWrapper,
  ProductsList,
  ProductsListTitle,
  ProductContainer,
  ProductInfo,
  ProductName,
  ProductPrice,
  ProductCategory,
  ProductButtonsContainer,
  ProductDetailButton,
  ProductRemoveButton,
  EmptyListMessage,
  EmptyList,
} from './styles';
import formatValue from '../../utils/formatValue';
import { Alert } from 'react-native';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  amount: number;
  price: number;
  formattedPrice: string;
  formattedCreatedDate: string;
  formattedUpdatedDate: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { reset, navigate } = useNavigation();

  useEffect(() => {
    api.get('/products').then((response) => {
      setProducts(
        response.data.map((product: Product) => ({
          ...product,
          formattedPrice: formatValue(product.price),
        })),
      );
    });
  }, []);

  const navigateToSignIn = useCallback(() => {
    reset({
      routes: [{ name: 'SignIn' }],
      index: 0,
    });
  }, [reset]);

  const navigateToAddProduct = useCallback(() => {
    navigate('AddProduct');
  }, [navigate]);

  async function navigateToProductDetail(productId: string): Promise<void> {
    navigate('ProductDetail', { productId });
  }

  const handleRemoveProduct = (productId: string) => {
    Alert.alert(
      'Remove Product',
      'Are you sure want to remove this product?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            removeProduct(productId);
          },
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  };

  const removeProduct = useCallback(async (productId: string) => {
    try {
      await api.delete(`/products/${productId}`).then(() => {
        const updatedProducts = products.filter(
          (productItem) => productItem.id !== productId,
        );
        setProducts(updatedProducts);
      });
    } catch (error) {
      Alert.alert(error);
    }
  }, []);

  return (
    <Container>
      <Header>
        <CommonHeaderButton></CommonHeaderButton>
        <HeaderTitle>Inventory Control</HeaderTitle>
        <AddProductButton onPress={() => navigateToAddProduct()}>
          <Feather name="plus" size={22} color="#f4ede8" />
        </AddProductButton>
      </Header>
      <ProductsListWrapper>
        {products.length > 0 && (
          <ProductsList
            data={products}
            keyExtractor={(product) => product.id}
            ListHeaderComponent={
              <ProductsListTitle>Products List</ProductsListTitle>
            }
            renderItem={({ item: product }) => (
              <ProductContainer>
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductCategory>
                    Category: {product.category}
                  </ProductCategory>
                  <ProductPrice>Price: {product.formattedPrice}</ProductPrice>
                </ProductInfo>
                <ProductButtonsContainer>
                  <ProductDetailButton
                    onPress={() => {
                      navigateToProductDetail(product.id);
                    }}
                  >
                    <Feather name="info" size={22} color="#f4ede8" />
                  </ProductDetailButton>
                  <ProductRemoveButton
                    onPress={() => {
                      handleRemoveProduct(product.id);
                    }}
                  >
                    <Feather name="trash" size={22} color="#f4ede8" />
                  </ProductRemoveButton>
                </ProductButtonsContainer>
              </ProductContainer>
            )}
          />
        )}
        {products.length === 0 && (
          <EmptyList>
            <EmptyListMessage>
              The product list is empty. You can press the + button to create a
              new product. Once created, the product will appear here.
            </EmptyListMessage>
          </EmptyList>
        )}
      </ProductsListWrapper>
    </Container>
  );
};

export default ProductList;
