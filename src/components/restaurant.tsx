import { FunctionComponent } from "react";
import { Box, Button, Text, Title, zmp } from "zmp-framework/react";
import { Restaurant } from "../models";
import Distance from "./distance";
import DistrictName from "./district-name";

interface RestaurantProps {
  layout: 'cover' | 'list-item';
  restaurant: Restaurant;
}

const RestaurantItem: FunctionComponent<RestaurantProps> = ({ layout, restaurant }) => {
  const viewDetail = () => {
    zmp.views.main.router.navigate({
      path: '/restaurant',
      query: {
        id: restaurant.id
      }
    })
  }

  if (layout === 'cover') {
    return <div onClick={viewDetail} className="bg-white rounded-xl overflow-hidden p-0 restaurant-with-cover">
      <img src={restaurant.image} className="object-cover aspect-cinema" />
      <Title size="small" className="mt-2 mb-0 mx-4">{restaurant.name}</Title>
      <Box flex mt="0">
        <Button className="text-red-500" iconZMP="zi-location" small>
          <span className="text-gray-500"><DistrictName id={restaurant.districtId} /></span>
        </Button>
        <Button iconZMP="zi-send-solid" small>
          <span className="text-gray-500">
            <Distance location={restaurant.location} />
          </span>
        </Button>
      </Box>
    </div>
  }
  return <div onClick={viewDetail} className="bg-white rounded-xl overflow-hidden p-0 restaurant-with-cover">
    <Box m="0" flex>
      <img src={restaurant.image} className="w-32 aspect-card object-cover rounded-xl" />
      <Box my="4" mx="5">
        <Title size="small">{restaurant.name}</Title>
        <Text size="small" className="text-gray-500">{restaurant.address}</Text>
      </Box>
    </Box>
  </div>
}

export default RestaurantItem;