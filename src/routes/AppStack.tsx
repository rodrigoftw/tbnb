import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetail';
import AddProduct from '../pages/AddProduct';
import EditProduct from '../pages/EditProduct';

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="ProductList" component={ProductList} />
        <Screen name="ProductDetail" component={ProductDetail} />
        <Screen name="AddProduct" component={AddProduct} />
        <Screen name="EditProduct" component={EditProduct} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
