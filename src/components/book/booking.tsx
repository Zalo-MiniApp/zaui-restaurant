import { FunctionComponent, useMemo, useState } from "react";
import { Box, Button, Card, Text, Title } from "zmp-framework/react";
import { Booking } from "../../models";
import store from "../../store";
import Price from "../format/price";
import Time from "../format/time";
import RestaurantItem from "../restaurant";

interface BookingItemProps {
  booking: Booking
}

const BookingItem: FunctionComponent<BookingItemProps> = ({ booking }) => {
  const total = useMemo(() => {
    const serviceFee = 25000;
    if (!booking.cart) return serviceFee;
    return booking.cart.items.reduce((total, item) => total + item.food.price * item.quantity, serviceFee);
  }, [booking])
  const [selectingState, setSelectingState] = useState(false);
  const unbook = (bookingId: string) => {
    store.dispatch('unbook', bookingId);
  }

  return <Box flex alignItems="center">
    <div
      onClick={() => setSelectingState(s => !s)}
      className="bg-white rounded-xl pb-8 pt-6 px-4 relative duration-200 w-full"
      style={{
        left: selectingState ? -64 : 0
      }}
    >
      <Box mx="0" flex justifyContent="space-between" alignItems="center">
        <Title size="small">Booking ID: {booking.id}</Title>
        <Text className="ml-6 text-orange-500 mb-0" size="xlarge" bold><Price amount={total} /></Text>
      </Box>
      <div className="border rounded-xl">
        <RestaurantItem
          layout="list-item"
          restaurant={booking.restaurant}
          before={booking.bookingInfo ? <Text size="small" className="text-gray-500">
            <Time time={booking.bookingInfo?.hour} />
            {' - '}
            {booking.bookingInfo.date.toLocaleDateString()}
          </Text> : <Text size="small" className="text-gray-500">Chỉ đặt thức ăn</Text>}
          onClick={() => { }}
        />
      </div>
    </div>
    {selectingState && <Button onClick={() => unbook(booking.id)} typeName="secondary" className="absolute right-4">Huỷ</Button>}
  </Box>;
}

export default BookingItem;