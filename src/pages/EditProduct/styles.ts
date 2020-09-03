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

export const InfoButton = styled.TouchableOpacity``;

export const Content = styled.View`
  padding: 0 24px 0;
`;
