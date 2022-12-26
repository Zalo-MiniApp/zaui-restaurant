import { Box, Page } from "zmp-ui";
import RestaurantDetail from "./restaurant/detail";
import React from "react";

function RestaurantPage() {
  return (
    <Page>
      <RestaurantDetail />
      <Box height={200}></Box>
    </Page>
  );
}

export default RestaurantPage;
