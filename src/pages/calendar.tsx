import React from "react";
import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Button, Page } from "zmp-ui";
import BookingItem from "../components/book/booking";
import { Booking } from "../models";
import { bookingsState } from "../state";

const labels = {
  upcoming: 'Sắp đến',
  finished: 'Hoàn thành',
}

function PageHeader({ status, setStatus }) {
  return <>
    <Box m={0} className="fixed top-0 left-0 right-0 pt-12">
      <Box m={0} flex>
        {['upcoming', 'finished'].map(s => <Button
          key={s}
          className={`border-b-2 rounded-none px-4 flex-1 mx-4 ${status === s ? 'border-primary' : ''}`}
          variant={status === s ? undefined : 'tertiary'}
          onClick={() => setStatus(s)}
        >
          {labels[s]}
        </Button>)}
      </Box>
    </Box>
    <Box height={48}></Box>
  </>;
}

function CalendarPage() {
  const [status, setStatus] = useState<'upcoming' | 'finished'>('upcoming');
  const allBookings = useRecoilValue(bookingsState);
  const bookings = useMemo(() => {
    return allBookings.filter(b => {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      if (status == "finished") {
        return b.bookingInfo && b.bookingInfo.date < startOfToday;
      } else {
        return !b.bookingInfo || b.bookingInfo.date >= startOfToday;
      }
    });
  }, [status, allBookings])

  return <Page>
    <PageHeader status={status} setStatus={setStatus} />
    {bookings.length === 0 ?
      <Box className="text-center" mt="10">Bạn chưa có booking nào {status === 'upcoming' ? 'sắp đến' : 'hoàn thành'}!</Box> : <>
        {bookings.map(booking => <Box key={booking.id} my={4}><BookingItem booking={booking} /></Box>)}
      </>}
  </Page>;
}

export default CalendarPage;