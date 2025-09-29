import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderScreen from '../screens/OrderScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const linking = {
  prefixes: ['mvshop://'],
  config: {
    screens: {
      Order: 'order/:id',
      ProductList: 'products',
      ProductDetail: 'products/:id',
      Cart: 'cart',
      Checkout: 'checkout',
    },
  },
};

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="ProductList">
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
    </Stack.Navigator>
  );
}
