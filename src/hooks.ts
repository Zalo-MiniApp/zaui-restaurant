import { useMemo } from "react"
import { Booking } from "./models"
import { getConfig } from "./components/config-provider";
import { useRecoilValue } from "recoil";
import { restaurantsState } from "./state";

export const useRestaurant = (id?: number) => {
  const restaurants = useRecoilValue(restaurantsState);
  const restaurant = useMemo(() => {
    return restaurants.find(restaurant => restaurant.id == (id ? id : Number(new URLSearchParams(location.search).get('id'))));
  }, [restaurants, id, location.search])
  return restaurant
}

export const useBookingTotal = (booking?: Booking) => {
  const total = useMemo(() => {
    const serviceFee = getConfig(c => c.template.serviceFee);
    if (!booking || !booking.cart) return serviceFee;
    return booking.cart.items.reduce((total, item) => total + item.food.price * item.quantity, serviceFee);
  }, [booking])
  return [total];
}