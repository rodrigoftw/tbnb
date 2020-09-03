import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background: #3e3b47;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'Poppins_400Regular';
  line-height: 28px;
`;

export const BackButton = styled.TouchableOpacity``;

export const EditProductButton = styled.TouchableOpacity``;

export const ProductContainer = styled.View`
  padding: 20px;
`;

export const ProductName = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
  color: #f4ede8;
  font-family: 'Poppins_400Regular';
`;

export const ProductDescription = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 16px;
  line-height: 28px;
  color: #f4ede8;
  text-align: justify;
  margin-bottom: 32px;
`;

export const ProductInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: #f4ede8;
  border-bottom-width: 0.7px;
  margin: 8px 0;
`;

export const ProductInfoLabel = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 14px;
  line-height: 28px;
  color: #f4ede8;
`;

export const ProductInfo = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 16px;
  line-height: 28px;
  color: #f4ede8;
`;
