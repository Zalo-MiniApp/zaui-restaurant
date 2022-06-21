import { useEffect } from 'react';
import { App, Box, TabView, View, zmpready } from 'zmp-framework/react';
import api from 'zmp-sdk';
import Header from './header';
import NavigationBar from './navigation-bar';
import store from '../store';

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
    <App {...zmpparams} >
      <TabView className="safe-areas">
        <Header />

        <View id="view-home" main tab tabActive url="/" />
        <View id="view-calendar" name="calendar" tab url="/calendar/" />

        <NavigationBar />
      </TabView>
    </App>
  );
}
export default MyApp;