import { useEffect, useMemo, useState } from "react"
import { useStore, zmp } from "zmp-framework/react"
import { Router } from "zmp-core/types";
import { Restaurant } from "./models"

export const useRestaurant = (id: number) => {
  const restaurants = useStore('restaurants') as Restaurant[]
  const restaurant = useMemo(() => {
    return restaurants.find(restaurant => restaurant.id == id);
  }, [id])
  return restaurant
}

export const useCurrentRoute = () => {
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
  return [currentRoute];
}