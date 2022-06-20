import { useMemo } from "react"
import { useStore } from "zmp-framework/react"
import { Restaurant } from "./models"

export const useRestaurant = (id: number) => {
  const restaurants = useStore('restaurants') as Restaurant[]
  const restaurant = useMemo(() => {
    return restaurants.find(restaurant => restaurant.id == id);
  }, [id])
  return restaurant
}