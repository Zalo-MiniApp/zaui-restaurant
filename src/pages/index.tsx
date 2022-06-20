import { Page, List, ListItem, useStore, Title, Box } from 'zmp-framework/react';
import Inquiry, { QuickFilter } from '../components/inquiry';
import RestaurantItem from '../components/restaurant';
import { Restaurant } from '../models';

function Popular() {
  const populars = useStore('populars') as Restaurant[];

  return <>
    <Box mx="4" my="3">
      <Title>Địa điểm phổ biến</Title>
    </Box>
    <div className='overflow-auto snap-x snap-mandatory scroll-p-4 no-scrollbar'>
      <Box m="0" pr="4" flex className='w-max'>
        {populars.map(restaurant => <Box ml="4" mr="0" className='snap-start' style={{ width: 'calc(100vw - 120px)' }}>
          <RestaurantItem key={restaurant.id} layout="cover" restaurant={restaurant} />
        </Box>)}
      </Box>
    </div>
  </>;
}

const HomePage = () => {
  return (
    <Page name="home" >
      <Box m="4">
        <Title>Hôm nay bạn muốn ăn ở đâu?</Title>
        <Inquiry />
        <Title>Phân loại nhanh</Title>
        <QuickFilter />
      </Box>
      <Popular />

      {/* Route */}
      <List>
        <ListItem title="Dynamic (Component) Route" link="/dynamic-route/?blog=45&post=125&foo=bar" />
        <ListItem title="Default Route (404)" link="/something-that-doesnt-exist" />
        <ListItem title="About" link="/about/" />
      </List>
    </Page>
  );
}

export default HomePage;