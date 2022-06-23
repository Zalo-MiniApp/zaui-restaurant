import { useEffect, useMemo, useState } from "react";
import { Box, Button, Sheet, Text, Title, useStore } from "zmp-framework/react";
import { Cart, Extra, Food } from "../models";
import store from "../store";
import ExtraSelection from "../components/menu/extra-selection";
import Notch from "../components/menu/notch";
import Price from "../components/format/price";

function FoodPicker({ zmproute, zmprouter }) {
  const [options, setOptions] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const foods = useStore('foods') as Food[];
  const cart = useStore('cart') as Cart;
  const food = useMemo(() => {
    if (zmproute.query) {
      const foodId = zmproute.query.id;
      if (foodId) {
        return foods.find(food => food.id === Number(foodId));
      }
      const cartItemIndex = zmproute.query.cartItemIndex;
      if (cartItemIndex) {
        setQuantity(cart.items[cartItemIndex].quantity);
        return cart.items[cartItemIndex].food;
      }
    }
    return undefined;
  }, [])
  const addToCart = () => {
    store.dispatch('addToCart', {
      cartItemIndex: zmproute.query?.cartItemIndex,
      quantity,
      food: {
        ...food,
        extras: food?.extras.map((e, index) => ({
          ...e,
          options: e.options.map(o => ({
            ...o,
            selected: options[index] === o.key
          }))
        }))
      } as Food,
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
    {food.extras.map((extra, index) => <Box m="5" key={extra.key}>
      <ExtraSelection extra={extra} onChange={selected => setOptions(o => {
        o[index] = selected;
        return [...o];
      })} />
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