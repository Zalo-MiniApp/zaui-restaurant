import { FunctionComponent } from "react";
import { Box, Button, Card, Title } from "zmp-framework/react";
import { Restaurant } from "../models";
import Distance from "./distance";
import DistrictName from "./district-name";

interface RestaurantProps {
  layout: 'cover' | 'list-item';
  restaurant: Restaurant;
}

const RestaurantItem: FunctionComponent<RestaurantProps> = ({ layout, restaurant }) => {
  if (layout === 'cover') {
    return <Card className="bg-white rounded-xl overflow-hidden p-0 restaurant-with-cover">
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
    </Card>
  }
  return <Card>
  </Card>
}

export default RestaurantItem;