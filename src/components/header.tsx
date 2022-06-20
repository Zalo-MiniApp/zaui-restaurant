import { useEffect, useMemo, useState } from "react";
import { Router } from "zmp-core/types";
import { Avatar, Box, Text, Title, useStore, zmp } from "zmp-framework/react";
import { userInfo } from "zmp-sdk";
import { useRestaurant } from "../hooks";
import { Restaurant } from "../models";

function Header() {
  const user: userInfo = useStore('user')
  const [currentRoute, setCurrentRoute] = useState({
    path: '/',
  } as Router.Route)
  useEffect(() => {
    const handleRouteChange = (route) => {
      setCurrentRoute(route)
    }
    zmp.on('routeChange', handleRouteChange);
    return () => {
      zmp.off('routeChange', handleRouteChange)
    }
  }, [])

  const restaurant = useRestaurant(Number(currentRoute.query?.id));

  const title = useMemo(() => {
    if (currentRoute.path === '/restaurant/') {
      if (restaurant) {
        return restaurant.name
      }
    }
    return 'Nhà hàng Jolliboo'
  }, [currentRoute])

  return <Box>
    <Title>{title}</Title>
    {currentRoute?.path === '/' && <Box mt="5">
      <Avatar src={user.avatar} />
      <Text>Chào, {user.name}!</Text>
    </Box>}
  </Box>;
}

export default Header;