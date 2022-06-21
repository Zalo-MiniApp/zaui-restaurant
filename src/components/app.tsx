import { useEffect } from 'react';
import { App, Box, TabView, View, zmpready } from 'zmp-framework/react';
import api from 'zmp-sdk';
import Header from './header';
import NavigationBar from './navigation-bar';
import store from '../store';
import FoodPicker from './menu/food-picker';
import Cart from './cart';

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

  return (
    <App {...zmpparams}>
      <TabView className="safe-areas">
        <Header />

        <View
          id="view-home"
          main
          tab
          tabActive
          url="/"
          routesAdd={[
            {
              path: '/food-picker/',
              popup: {
                component: FoodPicker,
              },
            }]}
        />
        <View id="view-calendar" name="calendar" tab url="/calendar/" />

        <NavigationBar />
        <Cart />
      </TabView>
    </App>
  );
}
export default MyApp;