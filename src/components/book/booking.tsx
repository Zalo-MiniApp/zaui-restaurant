import React from "react";
import { FunctionComponent, useState } from "react";
import { Box, Button, Text } from "zmp-ui";
import { useNavigate } from 'react-router-dom';
import { useBookingTotal } from "../../hooks";
import { Booking } from "../../models";
import Price from "../format/price";
import Time from "../format/time";
import RestaurantItem from "../restaurant";
import Swipeable from "../swipeable";
import BookingDetail from "../../pages/booking-detail";

interface BookingItemProps {
  booking: Booking
}

const { Title } = Text;

const BookingItem: FunctionComponent<BookingItemProps> = ({ booking }) => {
  const [total] = useBookingTotal(booking);
  const navigate = useNavigate();
  const [selectingState, setSelectingState] = useState(false);
  const unbook = (id: string) => {

  }

  return <Box flex alignItems="center" p={4}>
    <Swipeable
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          setSelectingState(s => !s)
        }
      }}
      onSwipeLeft={() => setSelectingState(true)}
      onSwipeRight={() => setSelectingState(false)}
      className="bg-white rounded-xl pb-8 pt-4 px-4 relative duration-200 w-full z-10 min-w-0"
      style={{
        left: selectingState ? -64 : 0
      }}
    >
      <Box mx={0} my={4} flex justifyContent="space-between" alignItems="center">
        <Title size="small" className="whitespace-nowrap mb-0">Booking ID: {booking.id}</Title>
        <Text className="ml-6 text-secondary mb-0 whitespace-nowrap font-semibold" size="large"><Price amount={total} /></Text>
      </Box>
      <div className="border border-solid border-gray-100 rounded-xl">
        <BookingDetail booking={booking}>
          {open => <RestaurantItem
            layout="list-item"
            restaurant={booking.restaurant}
            before={booking.bookingInfo ? <Text size="small" className="text-gray-500">
              <Time time={booking.bookingInfo?.hour} />
              {' - '}
              {booking.bookingInfo.date.toLocaleDateString()}
            </Text> : <Text size="small" className="text-gray-500">Chỉ đặt thức ăn</Text>}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSelectingState(false);
              open();
            }}
          />}
        </BookingDetail>
      </div>
    </Swipeable>
    <Button onClick={() => unbook(booking.id)} variant="secondary" className={`absolute right-4 min-w-min p-3 ${selectingState ? 'opacity-100' : 'opacity-0'}`}>Huỷ</Button>
  </Box >;
}

export default BookingItem;