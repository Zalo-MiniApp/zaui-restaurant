import { Page, useStore, Title, Box, Avatar, Text } from 'zmp-framework/react';
import { userInfo } from 'zmp-sdk';
import { getConfig } from '../components/config-provider';
import Inquiry, { QuickFilter } from '../components/inquiry';
import RestaurantItem from '../components/restaurant';
import { Restaurant } from '../models';

function Popular() {
  const populars = useStore('populars') as Restaurant[];

  return <>
    <Box mx="4" mt="6">
      <Title size='small'>Địa điểm phổ biến</Title>
    </Box>
    {populars.length ?
      <div className='overflow-auto snap-x snap-mandatory scroll-p-4 no-scrollbar'>
        <Box m="0" pr="4" flex className='w-max'>
          {populars.map(restaurant => <Box key={restaurant.id} ml="4" mr="0" className='snap-start' style={{ width: 'calc(100vw - 120px)' }}>
            <RestaurantItem layout="cover" restaurant={restaurant} />
          </Box>)}
        </Box>
      </div> :
      <Box mx="4">Không có địa điểm nào ở khu vực này</Box>
    }
  </>;
}

function Nearest() {
  const nearests = useStore('nearests') as Restaurant[];
  return <>
    <Box mx="4" mt="5">
      <Title size='small'>Gần bạn nhất</Title>
      {nearests.map(restaurant => <Box key={restaurant.id} mx="0" my="3">
        <RestaurantItem layout="list-item" restaurant={restaurant} after={<Text size="small" className="text-gray-500">{restaurant.address}</Text>} />
      </Box>)}
    </Box>
  </>;
}

const HomePage = () => {
  const user: userInfo = useStore('user')

  return (
    <Page name="home" >
      <Box mx="4" mb="4" mt="5">
        <Avatar className='shadow align-middle mb-2' src={user.avatar}>Hi</Avatar>
        <Text>{user.name ? <>Chào, {user.name}!</> : '...'}</Text>
        <Title size='xlarge' bold>Hôm nay bạn muốn ăn ở đâu?</Title>
        {getConfig(c => c.template.searchBar) && <>
          <Inquiry />
          <Title size='small' className='mt-6 mb-4'>Phân loại nhanh</Title>
        </>}
        <QuickFilter />
      </Box>
      <Popular />
      <Nearest />
    </Page>
  );
}

export default HomePage;