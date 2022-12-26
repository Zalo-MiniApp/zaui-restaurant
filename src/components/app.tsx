import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "../pages";
import Header from "./header";
import NavigationBar from "./navigation-bar";
import RestaurantPage from "../pages/restaurant";
import CalendarPage from "../pages/calendar";
import Cart from "./cart";
import { ConfigProvider, getConfig } from "./config-provider";

const MyApp = () => {
  return (
    <RecoilRoot>
      <ConfigProvider
        cssVariables={{
          "--zmp-primary-color": getConfig((c) => c.template.primaryColor),
          "--zmp-secondary-color": getConfig((c) => c.template.secondaryColor),
        }}
      >
        <App>
          <SnackbarProvider>
            <ZMPRouter>
              <Cart />
              <Header />
              <AnimationRoutes>
                <Route path="/" element={<HomePage />} />
                <Route path="/restaurant" element={<RestaurantPage />}></Route>
                <Route path="/calendar" element={<CalendarPage />}></Route>
              </AnimationRoutes>
              <NavigationBar />
            </ZMPRouter>
          </SnackbarProvider>
        </App>
      </ConfigProvider>
    </RecoilRoot>
  );
};
export default MyApp;
