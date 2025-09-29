import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { id: string };
  Cart: undefined;
  Checkout: undefined;
  Order: { id: string };
};
