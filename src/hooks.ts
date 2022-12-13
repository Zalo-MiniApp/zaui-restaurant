import { useMemo } from "react"
import { Booking } from "./models"
import api from 'zmp-sdk';
import { getConfig } from "./components/config-provider";
import { useRecoilValue } from "recoil";
import { restaurantsState } from "./state";

export const useRestaurant = (id: number) => {
  const restaurants = useRecoilValue(restaurantsState);
  const restaurant = useMemo(() => {
    return restaurants.find(restaurant => restaurant.id == id);
  }, [id])
  return restaurant
}

export const matchStatusBar = (sheetOpened: boolean) => {
  api.setNavigationBarColor({
    statusBarColor: sheetOpened ? '#404040' : getConfig(c => c.app.statusBarColor),
    color: '',
  });
}

export const useBookingTotal = (booking?: Booking) => {
  const total = useMemo(() => {
    const serviceFee = getConfig(c => c.template.serviceFee);
    if (!booking || !booking.cart) return serviceFee;
    return booking.cart.items.reduce((total, item) => total + item.food.price * item.quantity, serviceFee);
  }, [booking])
  return [total];
}