import { Box, Page } from "zmp-ui";
import { useLocation } from 'react-router-dom';
import { useRestaurant } from "../hooks";
import RestaurantContext from "./restaurant/context";
import RestaurantDetail from "./restaurant/detail";
import React from "react";

function RestaurantPage() {
  const location = useLocation();
  const restaurant = useRestaurant(Number(new URLSearchParams(location.search).get('id')))!;

  return <Page>
    <RestaurantContext.Provider value={{ restaurant }}>
      <RestaurantDetail />
    </RestaurantContext.Provider>
    <Box height={200}></Box>
  </Page>;
}

export default RestaurantPage;