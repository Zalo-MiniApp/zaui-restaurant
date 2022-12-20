import React from "react";
import { FC, ReactNode, useEffect, useState } from "react";
import { Box, Button, Checkbox, Icon, Input, Sheet, Text } from "zmp-ui";
import { CartItem, Food } from "../models";
import ExtraSelection from "./restaurant/menu/extra-selection";
import Price from "../components/format/price";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, foodsState } from "../state";
import { createPortal } from "react-dom";

const { Title } = Text;

const FoodPicker: FC<{
  children: (open: () => void) => ReactNode;
  food: Food;
  cartItemIndex?: number;
}> = ({ children, food, cartItemIndex }) => {
  const [extras, setExtras] = useState<string[]>([]);
  const [options, setOptions] = useState<boolean[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [note, setNote] = useState("");
  const foods = useRecoilValue(foodsState);
  const [cart, setCart] = useRecoilState(cartState);
  useEffect(() => {
    if (food) {
      setOptions(food.options.map(o => o.selected));
    }
  }, [food])
  const addToCart = () => {
    setCart(cart => {
      const item: CartItem = {
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
        }
      }
      const cartItems = [...cart.items];
      if (cartItemIndex) {
        cartItems[cartItemIndex] = item;
      } else {
        cartItems.push(item);
      }
      return {
        items: cartItems
      };
    });
    setOpened(false);
  }
  const [opened, setOpened] = useState(false);

  return <>
    {children(() => setOpened(true))}
    {createPortal(<Sheet
      visible={opened}
      onClose={() => setOpened(false)}
      autoHeight
      mask
      handler
      swipeToClose
      defaultSnapPoint={0}
      snapPoints={[0.4, 0]}
      onSnap={(nap) => {
        console.log("current point", nap);
      }}
    >
      <div className="w-full aspect-video object-cover overflow-hidden -mt-6 pointer-events-none -z-10">
        <img className="w-full h-full" src={food.image} />
      </div>
      <Box mt={6} mb={5} flex justifyContent="center" alignItems="center">
        <Button icon={<Icon icon="zi-minus-circle" />} disabled={quantity === 1} onClick={() => setQuantity(q => q - 1)}></Button>
        <Text className="mx-4">{quantity}</Text>
        <Button icon={<Icon icon="zi-plus-circle" />} onClick={() => setQuantity(q => q + 1)}></Button>
        <Text className="ml-6 text-secondary font-semibold" size="xLarge" bold><Price amount={food.price} /></Text>
      </Box>
      <Box textAlign="left" className="overflow-y-auto">
        <hr />
        {food.extras.map((extra, index) => <Box m={5} key={extra.key}>
          <ExtraSelection extra={extra} onChange={selected => setExtras(o => {
            o[index] = selected;
            return [...o];
          })} />
        </Box>)}
        <hr />
        <Box m={4}>
          <Title size="small">Mô tả</Title>
          <Text>{food.description}</Text>
        </Box>
        <hr />
        <Box m={4} mb={6} className="space-y-4">
          <Title size="small">Tuỳ chọn</Title>
          <Box className="flex flex-col gap-4">
            {food.options.map((option, i) => <Checkbox
              key={option.key}
              checked={options[i]}
              onChange={(e) => setOptions(o => {
                o[i] = e.target.checked;
                return [...o];
              })}
              value={""}
            >{option.label}</Checkbox>)}
          </Box>
        </Box>
        <hr />
        <Box m={4} mb={6}>
          <Title size="small" className="mb-4">Ghi chú</Title>
          <Input type="text" placeholder="Nhập ghi chú" value={note} onChange={e => setNote(e.target.value)} />
        </Box>
        <Box height={72}></Box>
        <Box className="fixed bottom-0 right-0 left-0 bg-white border-t duration-300" style={{ zIndex: 10000000, transform: opened ? 'none' : 'translateY(100%)' }}>
          <hr />
          <Box px={6} py={4}>
            <Button onClick={addToCart} fullWidth>Đồng ý</Button>
          </Box>
        </Box>
      </Box>
    </Sheet>, document.body)}
  </>;
}

export default FoodPicker;