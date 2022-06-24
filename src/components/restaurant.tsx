import { FunctionComponent } from "react";
import { Box, Button, Text, Title, zmp } from "zmp-framework/react";
import { Restaurant } from "../models";
import Distance from "./distance";
import DistrictName from "./district-name";

interface RestaurantProps {
  layout: 'cover' | 'list-item';
  restaurant: Restaurant;
  before?: React.ReactNode;
  after?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const RestaurantItem: FunctionComponent<RestaurantProps> = ({ layout, restaurant, before, after, onClick }) => {
  const viewDetail = () => {
    zmp.views.main.router.navigate({
      path: '/restaurant',
      query: {
        id: restaurant.id
      }
    })
  }

  if (layout === 'cover') {
    return <div onClick={onClick ?? viewDetail} className="bg-white rounded-xl overflow-hidden p-0 restaurant-with-cover">
      <img src={restaurant.image} className="w-full object-cover aspect-cinema" />
      <Title size="small" className="mt-2 mb-0 mx-4">{restaurant.name}</Title>
      <Box flex mt="0">
        <Button className="text-red-500" iconZMP="zi-location-solid" small>
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
  return <div onClick={onClick ?? viewDetail} className="bg-white rounded-xl overflow-hidden p-0 restaurant-with-cover">
    <Box m="0" flex>
      <img src={restaurant.image} className="w-32 aspect-card object-cover rounded-xl" />
      <Box my="4" mx="5">
        {before}
        <Title size="small">{restaurant.name}</Title>
        {after}
        <Box flex>
          <Button iconZMP="zi-star-solid" small className="text-yellow-400 pl-0">
            <span className="text-gray-500">
              {restaurant.rating}
            </span>
          </Button>
          <Button iconZMP="zi-send-solid" small>
            <span className="text-gray-500">
              <Distance location={restaurant.location} />
            </span>
          </Button>
        </Box>
      </Box>
    </Box>
  </div>
}

export default RestaurantItem;