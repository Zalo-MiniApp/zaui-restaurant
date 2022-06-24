import { useState } from "react";
import { Box, Button, Link, Page, Title, useStore, zmp } from "zmp-framework/react";
import BookingItem from "../components/book/booking";
import { Booking } from "../models";

const labels = {
  upcoming: 'Sắp đến',
  finished: 'Hoàn thành',
}

function PageHeader({ status, setStatus }) {
  return <>
    <Box m="0" className="fixed top-0 left-0 right-0 pt-2 bg-white">
      <Title className="flex items-center">
        <Link onClick={() => zmp.$('.tab-link[data-tab="#view-home"]').click()} iconZMP="zi-arrow-left" className="pl-2 pr-4" />
        Lịch của tôi
      </Title>
      <Box m="0" mt="5" flex>
        {['upcoming', 'finished'].map(s => <Button
          key={s}
          className={`border-b-2 rounded-none px-4 flex-1 mx-4 ${status === s ? 'border-blue-500' : ''}`}
          typeName={status === s ? undefined : 'ghost'}
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
  const [status, setStatus] = useState('upcoming');
  const bookings = useStore('bookings') as Booking[];

  return <Page>
    <PageHeader status={status} setStatus={setStatus} />
    {bookings.map(booking => <Box my="4"><BookingItem key={booking.id} booking={booking} /></Box>)}
    {!bookings.length && <Box className="text-center" mt="10">Bạn chưa có booking nào {status === 'upcoming' ? 'sắp đến' : 'hoàn thành'}!</Box>}
  </Page>;
}

export default CalendarPage;