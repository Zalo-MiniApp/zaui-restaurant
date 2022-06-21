import { useMemo, useState } from "react";
import { Box, Button, Sheet, Text, Title, useStore } from "zmp-framework/react";
import { Food } from "../../models";
import store from "../../store";
import Price from "../Price";
import ExtraSelection from "./extra-selection";
import Notch from "./notch";

function FoodPicker({ zmproute, zmprouter }) {
  const foods = useStore('foods') as Food[];
  const food = useMemo(() => {
    const foodId = zmproute.query?.id;
    if (foodId) {
      return foods.find(food => food.id === Number(foodId));
    }
    return undefined;
  }, [])
  const [quantity, setQuantity] = useState(1);
  const addToCart = () => {
    store.dispatch('addToCart', {
      quantity,
      food,
    }).then(() => {
      zmprouter.back();
    })
  }

  return food ? <Sheet className="overflow-hidden h-fit" swipeToClose>
    <Notch />
    <img className="w-full aspect-video object-cover" src={food.image} />
    <Box mt="6" mb="5" flex justifyContent="center" alignItems="center">
      <Button fill className="w-10" onClick={() => setQuantity(q => q - 1)}><div className="border-t border-white w-4" /></Button>
      <Text className="mx-4">{quantity}</Text>
      <Button fill className="w-10" iconZMP="zi-plus" onClick={() => setQuantity(q => q + 1)}></Button>
      <Text className="ml-6 text-orange-500 mb-0" size="xlarge" bold><Price amount={food.price} /></Text>
    </Box>
    <hr />
    {food.extras.map(extra => <Box m="5" key={extra.key}>
      <ExtraSelection extra={extra} />
    </Box>)}
    <hr />
    <Box m="4">
      <Title size="small">Mô tả</Title>
      <Text>{food.description}</Text>
    </Box>
    <hr />
    <Box m="6">
      <Button onClick={addToCart} large fill responsive className="rounded-xl">Đồng ý</Button>
    </Box>
  </Sheet> : <></>;
}

export default FoodPicker;