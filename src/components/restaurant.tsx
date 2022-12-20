import React from "react";
import { FunctionComponent } from "react";
import { Box, Button, Icon, Text } from "zmp-ui";
import { useNavigate } from 'react-router-dom';
import { Restaurant } from "../models";
import Distance from "./distance";
import DistrictName from "./district-name";

const { Title } = Text;

interface RestaurantProps {
  layout: 'cover' | 'list-item';
  restaurant: Restaurant;
  before?: React.ReactNode;
  after?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const RestaurantItem: FunctionComponent<RestaurantProps> = ({ layout, restaurant, before, after, onClick }) => {
  const navigate = useNavigate();
  const viewDetail = () => {
    navigate({
      pathname: '/restaurant',
      search: new URLSearchParams({
        id: String(restaurant.id)
      }).toString()
    })
  }

  if (layout === 'cover') {
    return <div onClick={onClick ?? viewDetail} className="relative bg-white rounded-xl overflow-hidden p-0 restaurant-with-cover">
      <div className="aspect-cinema relative w-full">
        <img src={restaurant.image} className="absolute w-full h-full object-cover" />
      </div>
      <div className="absolute left-3 top-3 py-1 px-3 space-x-1 flex items-center font-semibold text-sm text-white bg-primary rounded-full">
        <Icon icon="zi-star-solid" className="text-yellow-400" size={16} />
        <span>{restaurant.rating}</span>
      </div>
      <Title size="small" className="mt-2 mb-0 mx-4">{restaurant.name}</Title>
      <Box flex mt={0} mb={2}>
        <Button className="text-red-500" prefixIcon={<Icon className="text-red-500" icon="zi-location-solid" />} size="small" variant="tertiary">
          <span className="text-gray-500"><DistrictName id={restaurant.districtId} /></span>
        </Button>
        <Button prefixIcon={<Icon icon="zi-send-solid" />} size="small" variant="tertiary">
          <span className="text-gray-500">
            <Distance location={restaurant.location} />
          </span>
        </Button>
      </Box>
    </div>
  }
  return <div onClick={onClick ?? viewDetail} className="bg-white rounded-xl overflow-hidden p-0 restaurant-with-cover">
    <Box m={0} flex>
      <div className="flex-none aspect-card relative w-32">
        <img src={restaurant.image} className="absolute w-full h-full object-cover rounded-xl" />
      </div>
      <Box my={4} mx={5} className="min-w-0">
        {before}
        <Title size="small">{restaurant.name}</Title>
        {after}
        <Box mx={0} mb={0} flex>
          <Button prefixIcon={<Icon className="text-yellow-400" icon="zi-star-solid" />} size="small" className="pl-0" variant="tertiary">
            <span className="text-gray-500 font-semibold">
              {restaurant.rating}
            </span>
          </Button>
          <Button prefixIcon={<Icon icon="zi-send-solid" />} size="small" variant="tertiary">
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