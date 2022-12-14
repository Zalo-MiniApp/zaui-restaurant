import React from 'react';
import { Route } from 'react-router-dom'
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from 'zmp-ui';
import { RecoilRoot } from 'recoil';
import HomePage from '../pages';
import Header from './header';
import NavigationBar from './navigation-bar';
import RestaurantPage from '../pages/restaurant';
import CalendarPage from '../pages/calendar';
import Cart from './cart';

const MyApp = () => {
  return (
    <RecoilRoot>
      <App >
        <SnackbarProvider>
          <ZMPRouter>
            <Header />
            <AnimationRoutes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/restaurant" element={<RestaurantPage />}></Route>
              <Route path="/calendar" element={<CalendarPage />}></Route>
            </AnimationRoutes>
            <NavigationBar />
            <Cart />
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
}
export default MyApp;