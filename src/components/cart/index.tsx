import React, { useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import { Box, Button, Sheet, Text } from "zmp-ui";
import { useNavigate, useLocation } from "react-router-dom";
import Price from "../format/price";
import { useRestaurant } from "../../hooks";
import { pay } from "../../services/zalo";
import { message } from "../../utils/notification";
import CartItem from "./cart-item";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  bookingsState,
  cartState,
  currentRestaurantTabState,
  totalState,
} from "../../state";
import FoodPicker from "../../pages/food-picker";

const { Title } = Text;

function CartDetail() {
  const cart = useRecoilValue(cartState);
  const navigate = useNavigate();
  const edit = (i: number) => {
    navigate({
      pathname: "/food-picker",
      search: new URLSearchParams({
        cartItemIndex: String(i),
      }).toString(),
    });
    setTimeout(() => {
      document.querySelector(".sheet-backdrop")?.classList.add("backdrop-in");
    }, 300); // workaround for backdrop not showing
  };

  return (
    <Box
      m={0}
      p={2}
      pt={3}
      className="overflow-y-auto"
      style={{ maxHeight: "50vh" }}
    >
      {cart.items.map((item, i) => (
        <FoodPicker key={i} cartItemIndex={i}>
          {(open) => <CartItem item={item} onEdit={open} />}
        </FoodPicker>
      ))}
    </Box>
  );
}

function Cart() {
  const cart = useRecoilValue(cartState);
  const total = useRecoilValue(totalState);
  const [expaned, setExpanded] = useState(false);
  const restaurant = useRestaurant();
  const location = useLocation();
  const navigate = useNavigate();
  const setRestaurantTab = useSetRecoilState(currentRestaurantTabState);
  const setBookings = useSetRecoilState(bookingsState);

  const sheetRef = useRef<any>();

  const nextStep = () => {
    sheetRef.current.snapTo(1);
    setExpanded(true);
  };

  useEffect(() => {
    document
      .querySelector(".sheet-backdrop")
      ?.classList[expaned ? "add" : "remove"]("backdrop-in");
  }, [expaned]);

  const currentTab = useRecoilValue(currentRestaurantTabState);

  const book = () => {
    setRestaurantTab("book");
  };

  const payFoods = async () => {
    await pay(total);
    setBookings((bookings) => [
      ...bookings,
      {
        id: +new Date() + "",
        restaurant: restaurant!,
        cart,
      },
    ]);
    message("Đặt thức ăn thành công");
    navigate("/calendar/");
  };
  const visible = useMemo(
    () =>
      cart.items.length > 0 &&
      location.pathname === "/restaurant" &&
      currentTab !== "book",
    [cart, location, currentTab]
  );
  useEffect(() => setExpanded(false), [visible]);

  return visible ? (
    <Sheet
      ref={sheetRef}
      mask={expaned}
      defaultSnapPoint={0}
      snapPoints={({ sheetModalHeight }) => [sheetModalHeight - 156, 0]}
      onSnap={(point) => setExpanded(point === 1)}
      visible={true}
      className={`cart-preview ${expaned ? "expanded" : "collapsed"}`}
    >
      {expaned && (
        <>
          <Box p={4} flex justifyContent="center">
            <Title className="font-semibold" size="small">
              Pizza
            </Title>
          </Box>
          <hr />
          <Title size="small" className="mx-6 my-4">
            Chi tiết
          </Title>
          <hr />
          <CartDetail />
          <hr />
        </>
      )}
      <Box
        className="swipe-handler"
        m={0}
        px={6}
        mt={expaned ? 6 : 2}
        flex
        justifyContent="space-between"
      >
        <Title size="small">Tổng cộng ({cart.items.length} món)</Title>
        <Text className="ml-6 text-secondary font-semibold" size="xLarge" bold>
          <Price amount={total} />
        </Text>
      </Box>
      <Box m={0} px={6} pt={6}>
        <Button
          size="large"
          fullWidth
          className="rounded-xl"
          onClick={expaned ? book : nextStep}
        >
          {expaned ? <span>Đặt bàn với thực đơn</span> : <span>Tiếp theo</span>}
        </Button>
      </Box>
      {expaned && (
        <Box m={0} px={6} pt={4} pb={6}>
          <Button
            onClick={payFoods}
            size="large"
            fullWidth
            className="rounded-xl"
            variant="secondary"
          >
            Chỉ đặt món ăn
          </Button>
        </Box>
      )}
    </Sheet>
  ) : (
    <></>
  );
}

export default Cart;
