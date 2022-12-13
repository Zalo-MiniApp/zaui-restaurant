import React from "react";
import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Button, Page, Tabs } from "zmp-ui";
import BookingItem from "../components/book/booking";
import { bookingsState } from "../state";

const labels = {
  upcoming: 'Sắp đến',
  finished: 'Hoàn thành',
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
    <Tabs activeKey={status} onChange={setStatus as any}>
      {['upcoming', 'finished'].map(status => <Tabs.Tab key={status} label={labels[status]}>
        {bookings.length === 0 ?
          <Box className="text-center" mt={10}>Bạn chưa có booking nào {status === 'upcoming' ? 'sắp đến' : 'hoàn thành'}!</Box> : <>
            {bookings.map(booking => <Box key={booking.id} my={4}><BookingItem booking={booking} /></Box>)}
          </>}
      </Tabs.Tab>)}
    </Tabs>

  </Page>;
}

export default CalendarPage;