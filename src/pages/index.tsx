import { Page, useStore, Title, Box } from 'zmp-framework/react';
import Inquiry, { QuickFilter } from '../components/inquiry';
import RestaurantItem from '../components/restaurant';
import { Restaurant } from '../models';

function Popular() {
  const populars = useStore('populars') as Restaurant[];

  return <>
    <Box mx="4" mt="6">
      <Title>Địa điểm phổ biến</Title>
    </Box>
    <div className='overflow-auto snap-x snap-mandatory scroll-p-4 no-scrollbar'>
      <Box m="0" pr="4" flex className='w-max'>
        {populars.map(restaurant => <Box key={restaurant.id} ml="4" mr="0" className='snap-start' style={{ width: 'calc(100vw - 120px)' }}>
          <RestaurantItem layout="cover" restaurant={restaurant} />
        </Box>)}
      </Box>
    </div>
  </>;
}

function Nearest() {
  const nearests = useStore('nearests') as Restaurant[];
  return <>
    <Box mx="4" mt="5">
      <Title>Gần bạn nhất</Title>
      {nearests.map(restaurant => <Box key={restaurant.id} mx="0" my="3">
        <RestaurantItem layout="list-item" restaurant={restaurant} />
      </Box>)}
    </Box>
  </>;
}

const HomePage = () => {
  return (
    <Page name="home" >
      <Box mx="4" mb="4" mt="0">
        <Title size='xlarge' bold>Hôm nay bạn muốn ăn ở đâu?</Title>
        <Inquiry />
        <Title className='mt-6 mb-4'>Phân loại nhanh</Title>
        <QuickFilter />
      </Box>
      <Popular />
      <Nearest />
    </Page>
  );
}

export default HomePage;