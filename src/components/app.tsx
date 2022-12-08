import { useEffect } from 'react';
import { App, View } from 'zmp-framework/react';
import api from 'zmp-sdk';
import Header from './header';
import NavigationBar from './navigation-bar';
import store from '../store';
import FoodPicker from '../pages/food-picker';
import Cart from './cart';
import BookingDetail from '../pages/booking-detail';
import { useSheetStatusBar } from '../hooks';
import ErrorBoundary from './error-boundary';
import { getUser, requestLocation } from '../services/zalo';
import { ConfigProvider, getConfig } from './config-provider';

const MyApp = () => {
  const zmpparams = {
    name: getConfig(c => c.app.title),
    theme: 'auto',
    store: store,
  };

  const init = async () => {
    await api.login();
    getUser();
    requestLocation();
  }

  useEffect(() => {
    init();
  }, [])

  useSheetStatusBar();

  return (
    <ErrorBoundary>
      <ConfigProvider cssVariables={{
        '--zmp-theme-color': getConfig(c => c.template.primaryColor),
        '--zmp-secondary-color': getConfig(c => c.template.secondaryColor),
      }}>
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
      </ConfigProvider>
    </ErrorBoundary>
  );
}
export default MyApp;