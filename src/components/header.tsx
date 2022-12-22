import React from "react";
import { useMemo } from "react";
import { useLocation } from 'react-router-dom';
import { Header } from "zmp-ui";
import { useRestaurant } from "../hooks";
import { getConfig } from "./config-provider";

function AppHeader() {
  const location = useLocation();

  const restaurant = useRestaurant(Number(new URLSearchParams(location.search).get('id')));

  const title = useMemo(() => {
    if (location.pathname === '/calendar') {
      return 'Lịch của tôi';
    }
    if (location.pathname === '/restaurant') {
      if (restaurant) {
        return restaurant.name
      }
    }
    return getConfig(c => c.app.title);
  }, [location.pathname])

  return <>
    <Header className="sticky top-0" title={title} style={{ backgroundColor: getConfig(c => c.app.statusBarColor) }} showBackIcon={location.pathname !== '/'} />
  </>;
}

export default AppHeader;