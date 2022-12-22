import { createElement, ReactNode } from "react";
import { Box, Button, Icon, Text } from "zmp-ui";
import Distance from "../../components/distance";
import DistrictName from "../../components/district-name";
import { TabType } from "../../models";
import Information from './information';
import Menu from "./menu";
import Booking from './booking';
import { useRecoilState } from "recoil";
import { currentRestaurantTabState } from "../../state";
import React from "react";
import { useRestaurant } from "../../hooks";

function RestaurantDetail() {
  const restaurant = useRestaurant();
  const [currentTab, setCurrentTab] = useRecoilState(currentRestaurantTabState);

  const TabItem = ({ tab, children }: { tab: TabType, children: ReactNode }) => <Button size="small" variant={currentTab === tab ? 'primary' : 'tertiary'} onClick={() => setCurrentTab(tab)} className="mx-1 flex-none">{children}</Button>;

  if (restaurant) {
    return <>
      <Box m={5}>
        <div className="relative aspect-video w-full">
          <img src={restaurant.image} className="absolute w-full h-full object-cover rounded-xl" />
        </div>
        <Box mx={4} className="bg-white rounded-2xl text-center relative restaurant-detail-box" p={4} style={{ marginTop: -60 }}>
          <Text className="font-bold">{restaurant.name}</Text>
          <Text className="text-gray-500">{restaurant.address}</Text>
          <Box flex justifyContent="center" mt={0} py={3}>
            <Button prefixIcon={<Icon icon="zi-location-solid" className="text-red-500" />} variant="tertiary">
              <span className="text-gray-500"><DistrictName id={restaurant.districtId} /></span>
            </Button>
            <Button prefixIcon={<Icon icon="zi-send-solid" />} variant="tertiary">
              <span className="text-gray-500">
                <Distance location={restaurant.location} />
              </span>
            </Button>
          </Box>
          <Box flex justifyContent="center" mb={0}>
            <TabItem tab="info">Thông tin</TabItem>
            <TabItem tab="menu">Thực đơn</TabItem>
            <TabItem tab="book">Đặt bàn</TabItem>
          </Box>
        </Box>
      </Box>
      {createElement({ info: Information, menu: Menu, book: Booking }[currentTab], { restaurant })}
    </>;
  }
  return <></>
}

export default RestaurantDetail;