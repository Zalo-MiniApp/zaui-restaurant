import { FunctionComponent, useState } from "react";
import { Avatar, Button, Icon, Text } from "zmp-ui";
import { Food } from "../../../models";
import Price from "../../../components/format/price";
import React from "react";
import FoodPicker from "../../food-picker";

const { Title } = Text;

interface FoodItemProps {
  food: Food
}

const FoodItem: FunctionComponent<FoodItemProps> = ({ food }) => {
  return <div className="p-6 bg-white text-center space-y-2" style={{ borderRadius: 50 }}>
    <Avatar size={96} src={food.image} />
    <Title size="small">{food.name}</Title>
    <Text size="xLarge" className="text-secondary font-semibold"><Price amount={food.price} /></Text>
    <FoodPicker food={food}>
      {open => <Button icon={<Icon icon="zi-plus" />} onClick={open}></Button>}
    </FoodPicker>
  </div>;
}

export default FoodItem;