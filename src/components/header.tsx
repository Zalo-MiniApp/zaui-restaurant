import React from "react";
import { useMemo } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Header, Button, Icon, Text, Box } from "zmp-ui";
import { matchStatusBar, useRestaurant } from "../hooks";
import { getConfig } from "./config-provider";

function AppHeader() {
  const location = useLocation();

  const restaurant = useRestaurant(Number(new URLSearchParams(location.search).get('id')));

  const title = useMemo(() => {
    if (location.pathname === '/calendar') {
      matchStatusBar(false, '#ffffff');
      return 'Lịch của tôi';
    }
    matchStatusBar(false);
    if (location.pathname === '/restaurant') {
      if (restaurant) {
        return restaurant.name
      }
    }
    return getConfig(c => c.app.title);
  }, [location.pathname])

  return <>
    <Header className="sticky top-0" title={title} style={{ backgroundColor: location.pathname === '/calendar' ? undefined : 'transparent' }} showBackIcon={location.pathname !== '/'} />
  </>;
}

export default AppHeader;