import { Box, Button, Icon, Link, Page, Text, Title } from "zmp-framework/react";
import Distance from "../components/distance";
import DistrictName from "../components/district-name";
import { useRestaurant } from "../hooks";
import { Restaurant } from "../models";
import api from 'zmp-sdk';
import { createContext, ReactNode, useContext, useState } from "react";
import Menu from "../components/menu";

function Time({ time }: { time: [number, number, 'AM' | 'PM'] }) {
  const [hour, minute, ampm] = time;
  return <>{`${hour}`.padStart(2, '0')}:{`${minute}`.padStart(2, '0')} {ampm}</>;
}

function Day({ day }: { day: number }) {
  return <>{['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'][day - 1]}</>;
}

function Information() {
  const { restaurant } = useContext(RestaurantContext);

  return <Box mx="2">
    <Box mx="2" mt="5">
      <Title>Thông tin</Title>
      <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente voluptas, corporis, doloremque nisi recusandae consequatur, magni ipsum deleniti sequi illo porro maxime voluptatibus vero animi excepturi repellat. Deleniti, corporis excepturi.</Text>
    </Box>
    <Box mx="2" mt="6">
      <Title>Giờ mở cửa</Title>
      <Box flex alignItems="center" justifyContent="space-between">
        <span><Icon zmp="zi-clock-1" className="text-green-500 mr-1" /><Time time={restaurant.hours.opening} /> - <Time time={restaurant.hours.closing} /></span>
        <span><Icon zmp="zi-calendar" className="text-orange-500 mr-1" /><Day day={restaurant.days.opening} /> - <Day day={restaurant.days.closing} /></span>
      </Box>
    </Box>
    <Box mx="2" mt="6">
      <Title>Hotline liên hệ</Title>
      <Box flex alignItems="center" justifyContent="space-between">
        <Button style={{ padding: 0 }} onClick={() => api.openPhone({ phoneNumber: restaurant.hotline })}><Icon zmp="zi-call" className="text-green-500 mr-1" />{restaurant.hotline}</Button>
      </Box>
    </Box>
    <Box mx="2" mt="6">
      <Title>Địa chỉ</Title>
      <Box flex alignItems="center" justifyContent="space-between" mb="5">
        <span><Icon zmp="zi-location-solid" className="text-red-500 mr-1" />{restaurant.address}</span>
      </Box>
      <iframe className="w-full aspect-cinema rounded-xl" src={restaurant.map} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </Box>
  </Box>;
}

function RestaurantDetail() {
  const { restaurant } = useContext(RestaurantContext);
  type TabType = 'info' | 'menu' | 'book';
  const [currentTab, setCurrentTab] = useState<TabType>('info');

  const TabItem = ({ tab, children }: { tab: TabType, children: ReactNode }) => <Button fill typeName={currentTab === tab ? 'primary' : 'tertiary'} onClick={() => setCurrentTab(tab)}>{children}</Button>;

  return <>
    <Box mt="5">
      <img src={restaurant.image} className="object-cover aspect-video rounded-xl" />
      <Box mx="4" className="bg-white rounded-2xl text-center relative restaurant-detail-box" p="4" style={{ marginTop: -60 }}>
        <Title bold>{restaurant.name}</Title>
        <Text className="text-gray-500">{restaurant.address}</Text>
        <Box flex justifyContent="center" mt="0" py="3">
          <Button className="text-red-500" iconZMP="zi-location-solid">
            <span className="text-gray-500"><DistrictName id={restaurant.districtId} /></span>
          </Button>
          <Button iconZMP="zi-send-solid">
            <span className="text-gray-500">
              <Distance location={restaurant.location} />
            </span>
          </Button>
        </Box>
        <Box flex justifyContent="space-between" mb="0">
          <TabItem tab="info">Thông tin</TabItem>
          <TabItem tab="menu">Thực đơn</TabItem>
          <TabItem tab="book">Đặt bàn</TabItem>
        </Box>
      </Box>
    </Box>
    {{ info: <Information />, menu: <Menu /> }[currentTab]}
  </>;
}

const RestaurantContext = createContext({
  restaurant: {} as Restaurant,
})

function RestaurantPage({ zmproute }) {
  const restaurant = useRestaurant(zmproute.query.id)

  return <Page>
    {restaurant ? <RestaurantContext.Provider value={{ restaurant }}>
      <RestaurantDetail />
    </RestaurantContext.Provider> : <Box flex flexDirection="column" justifyContent="center" alignItems="center">
      <Title>Trang này không khả dụng!</Title>
      <Link back>Quay về</Link>
    </Box>}

  </Page>;
}

export default RestaurantPage;