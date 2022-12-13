import React from "react";
import { useMemo } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Icon, Text } from "zmp-ui";
import { useRestaurant } from "../hooks";
import { getConfig } from "./config-provider";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const restaurant = useRestaurant(Number(new URLSearchParams(location.search).get('id')));

  const title = useMemo(() => {
    if (location.pathname === '/restaurant') {
      if (restaurant) {
        return restaurant.name
      }
    }
    return getConfig(c => c.app.title);
  }, [location.pathname])

  return <Box className="header">
    <Text.Title size="small" className="flex items-center p-2 pr-20">
      {location.pathname !== '/' && <Button variant="tertiary" type="neutral" className="pl-2 pr-4" onClick={() => navigate(-1)} icon={<Icon icon="zi-arrow-left" />} />}
      {title}
    </Text.Title>
  </Box>;
}

export default Header;