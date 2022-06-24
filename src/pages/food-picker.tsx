import { useEffect, useMemo, useState } from "react";
import { Box, Button, Checkbox, Input, Sheet, Text, Title, useStore } from "zmp-framework/react";
import { Cart, Food } from "../models";
import store from "../store";
import ExtraSelection from "../components/menu/extra-selection";
import Notch from "../components/menu/notch";
import Price from "../components/format/price";

function FoodPicker({ zmproute, zmprouter }) {
  const [extras, setExtras] = useState<string[]>([]);
  const [options, setOptions] = useState<boolean[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [note, setNote] = useState("");
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
  useEffect(() => {
    if (food) {
      setOptions(food.options.map(o => o.selected));
    }
  }, [food])
  const addToCart = () => {
    store.dispatch('addToCart', {
      cartItemIndex: zmproute.query?.cartItemIndex,
      quantity,
      note,
      food: {
        ...food,
        extras: food?.extras.map((e, index) => ({
          ...e,
          options: e.options.map(o => ({
            ...o,
            selected: extras[index] === o.key
          }))
        })),
        options: food?.options.map((o, index) => ({
          ...o,
          selected: options[index]
        })),
      } as Food,
    }).then(() => {
      zmprouter.back();
    })
  }

  return food ? <Sheet
    backdrop
    className="overflow-hidden h-auto"
    swipeToClose
    swipeToStep
    onSheetStepOpen={() => setExpanded(true)}
    onSheetStepClose={() => setExpanded(false)}
  >
    <Notch />
    <div className={`sheet-modal-swipe-step ${expanded ? '' : 'pb-1'}`}>
      <img className="w-full aspect-video object-cover" src={food.image} />
      <Box mt="6" mb="5" flex justifyContent="center" alignItems="center">
        <Button fill className="w-10" onClick={() => setQuantity(q => q - 1)}><div className="border-t border-white w-4" /></Button>
        <Text className="mx-4">{quantity}</Text>
        <Button fill className="w-10" iconZMP="zi-plus" onClick={() => setQuantity(q => q + 1)}></Button>
        <Text className="ml-6 text-orange-500 mb-0" size="xlarge" bold><Price amount={food.price} /></Text>
      </Box>
      <hr />
      {food.extras.map((extra, index) => <Box m="5" key={extra.key}>
        <ExtraSelection extra={extra} onChange={selected => setExtras(o => {
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
      {!expanded && <Box m="6">
        <Button onClick={addToCart} large fill responsive className="rounded-xl">Đồng ý</Button>
      </Box>}
    </div>
    <hr />
    <Box m="4" mb="6">
      <Title size="small">Tuỳ chọn</Title>
      {food.options.map((option, i) => <Checkbox
        key={option.key}
        checked={options[i]}
        onChange={(e) => setOptions(o => {
          o[i] = e.target.checked;
          return [...o];
        })}>{option.label}</Checkbox>)}
    </Box>
    <Box m="4" mb="6">
      <Title size="small" className="mb-4">Ghi chú</Title>
      <Input type="text" placeholder="Nhập ghi chú" value={note} onChange={e => setNote(e.target.value)} />
    </Box>
    <hr />
    {expanded && <Box m="6">
      <Button onClick={addToCart} large fill responsive className="rounded-xl">Đồng ý</Button>
    </Box>}
  </Sheet> : <></>;
}

export default FoodPicker;