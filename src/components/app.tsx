import React from 'react';
import { App, TabView, View } from 'zmp-framework/react';
import store from '../store';
import NavigationBar from './navigation-bar';

const MyApp = () => {
  // ZMP Parameters
  const zmpparams = {
    name: 'Nhà hàng Joliboo', // App name
    theme: 'auto', // Automatic theme detection
    // App store
    store: store,
  };

  return (
    <App {...zmpparams} >
      <TabView className="safe-areas">
        <NavigationBar />

        <View id="view-home" main tab tabActive url="/" />
        <View id="view-calendar" name="calendar" tab url="/calendar/" />
      </TabView>
    </App>
  );
}
export default MyApp;