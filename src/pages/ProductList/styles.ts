import styled from 'styled-components/native';
import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { Product } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LogOutButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'Poppins_400Regular';
  line-height: 28px;
`;

export const AddProductButton = styled.TouchableOpacity``;

export const ProductsListWrapper = styled.View`
  flex: 1;
  margin-bottom: ${getBottomSpace()}px;
`;

export const ProductsList = styled(FlatList as new () => FlatList<Product>)`
  padding: 16px 24px 16px;
`;

export const ProductsListTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 16px;
  color: #3e3b47;
  font-family: 'Poppins_400Regular';
`;

export const ProductContainer = styled.View`
  background: #3e3b47;
  border-radius: 8px;
  padding: 20px 0 20px 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ProductInfo = styled.View`
  flex: 1;
`;

export const ProductName = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 20px;
  line-height: 30px;
  color: #f4ede8;
`;

export const ProductCategory = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 14px;
  line-height: 28px;
  color: #f4ede8;
`;

export const ProductPrice = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 14px;
  line-height: 28px;
  color: #f4ede8;
`;

export const ProductAmount = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 14px;
  line-height: 28px;
  color: #f4ede8;
`;

export const ProductButtonsContainer = styled.View`
  margin: 0;
`;

export const ProductDetailButton = styled.TouchableOpacity`
  background: #3e3b47;
  padding: 16px;
  margin: 0 16px 0 0;
  align-items: center;
`;

export const ProductRemoveButton = styled.TouchableOpacity`
  background: #3e3b47;
  padding: 16px;
  margin: 0 16px 0 0;
  align-items: center;
`;

export const EmptyList = styled.View`
  flex: 1;
  margin: 36px;
  align-items: center;
  justify-content: center;
`;

export const EmptyListMessage = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 16px;
  line-height: 28px;
  color: #3e3b47;
  text-align: justify;
`;
