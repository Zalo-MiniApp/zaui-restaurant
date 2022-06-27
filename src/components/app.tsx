import { useEffect } from 'react';
import { App, Box, TabView, View, zmpready } from 'zmp-framework/react';
import api from 'zmp-sdk';
import Header from './header';
import NavigationBar from './navigation-bar';
import store from '../store';
import FoodPicker from '../pages/food-picker';
import Cart from './cart';
import BookingDetail from '../pages/booking-detail';
import { useSheetStatusBar } from '../hooks';

const MyApp = () => {
  const zmpparams = {
    name: 'Nhà hàng Joliboo',
    theme: 'auto',
    store: store,
  };

  const init = async () => {
    await api.login();
    const result = await api.getUserInfo({
      avatarType: 'small'
    });
    zmpready(() => store.dispatch('setUser', result.userInfo))
  }

  useEffect(() => {
    init();
  }, [])

  useSheetStatusBar();

  return (
    <App {...zmpparams}>
      <Header />
      <View
        main
        url="/"
        routesAdd={[
          {
            path: '/food-picker/',
            sheet: {
              component: FoodPicker,
            }
          }, {
            path: '/booking-detail/',
            sheet: {
              component: BookingDetail,
            }
          }
        ]}
      />
      <NavigationBar />
      <Cart />
    </App>
  );
}
export default MyApp;