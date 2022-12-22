import React from "react";
import { Box, Button, Text } from "zmp-ui";
import { useState } from "react";
import DateBooker from "../../components/book/date-booker";
import TableBooker from "../../components/book/table-booker";
import SeatsPicker from "../../components/book/seats-booker";
import TimeBooker from "../../components/book/time-booker";
import Price from "../../components/format/price";
import { pay } from "../../services/zalo";
import { message } from "../../utils/notification";
import { getConfig } from "../../components/config-provider";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookingsState, cartState, totalState } from "../../state";
import { useNavigate } from 'react-router-dom';
import { Restaurant } from "../../models";

const { Title } = Text;

function Booking({ restaurant }: { restaurant: Restaurant }) {
  const [seats, setSeats] = useState(4);
  const [hour, setHour] = useState(restaurant.hours.opening);
  const [date, setDate] = useState(new Date());
  const setBookings = useSetRecoilState(bookingsState);
  const [table, setTable] = useState('05');
  const total = useRecoilValue(totalState);
  const navigate = useNavigate();
  const cart = useRecoilValue(cartState);

  const book = async () => {
    const serviceFee = getConfig(c => c.template.serviceFee);
    await pay(serviceFee + total);
    setBookings(bookings => [...bookings, {
      restaurant,
      id: + new Date() + '',
      cart,
      bookingInfo: {
        seats,
        hour,
        date,
        table
      }
    }]);
    message('Đặt bàn thành công');
    navigate('/calendar');
  }

  return <>
    <Box mx={4} my={6}>
      <DateBooker onChange={setDate} />
      <Box flex justifyContent="space-between" my={6}>
        <TableBooker value={table} onChange={setTable} />
        <SeatsPicker value={seats} onChange={setSeats} />
      </Box>
      <TimeBooker hours={restaurant.hours} onChange={setHour} />
    </Box>
    <Box m={0} p={6} className="bg-white fixed bottom-0 left-0 right-0 shadow z-10 border">
      <Box mb={4} flex justifyContent="space-between">
        <Title size="small">Phí dịch vụ</Title>
        <Text className="ml-6 text-secondary font-semibold" size="xLarge"><Price amount={getConfig(c => c.template.serviceFee)} /></Text>
      </Box>
      <Button fullWidth onClick={book}>Đặt bàn</Button>
    </Box>
  </>;
}

export default Booking;