import { useEffect, useRef, useState } from "react";
import { Box, Button, Sheet, Text, Title, useStore, zmp } from "zmp-framework/react";
import { Cart, TabType, Booking } from "../../models";
import Notch from "../menu/notch";
import Price from "../format/price";
import { useCurrentRoute, useRestaurant } from "../../hooks";
import store from "../../store";
import { pay } from "../../services/zalo";
import { message } from "../../utils/notificaiton";
import CartItem from "./cart-item";

function CartDetail() {
  const cart = useStore('cart') as Cart;
  const edit = (i: number) => {
    zmp.views.main.router.navigate({
      path: '/food-picker/',
      query: {
        cartItemIndex: i
      }
    })
  }

  return <Box pt="1">
    {cart.items.map((item, i) => <CartItem key={i} item={item} onEdit={() => edit(i)} />)}
  </Box>;
}

function CartPreview() {
  const cart = useStore('cart') as Cart;
  const total = useStore('total') as number;
  const [expaned, setExpanded] = useState(false);
  const [currentRoute] = useCurrentRoute();
  const restaurant = useRestaurant(Number(currentRoute.query?.id));

  const sheetRef = useRef<any>();

  const nextStep = () => {
    sheetRef.current.zmpSheet().stepOpen();
    setExpanded(true);
  }

  useEffect(() => {
    document.querySelector('.sheet-backdrop')?.classList[expaned ? 'add' : 'remove']('backdrop-in');
  }, [expaned])

  const currentTab = useStore('restaurantTab') as TabType;

  const book = () => {
    store.dispatch('changeRestaurantTab', 'book' as TabType)
  }

  const payFoods = async () => {
    await pay(total);
    await store.dispatch('book', {
      id: + new Date() + '',
      restaurant: restaurant,
    } as Booking)
    message('Đặt thức ăn thành công');
    zmp.views.main.router.navigate('/calendar/');
  }

  return <Sheet
    ref={sheetRef}
    backdrop={false}
    opened={cart.items.length > 0 && currentRoute.path === '/restaurant/' && currentTab !== 'book'}
    closeByBackdropClick={false}
    className="h-auto border-t"
    swipeToStep
    onSheetStepOpen={() => setExpanded(true)}
    onSheetStepClose={() => setExpanded(false)}
    onSheetClose={() => setExpanded(false)}
  >
    <Notch color="#637875" />
    <Box p="1"></Box>
    <div className={`sheet-modal-swipe-step ${expaned ? 'pb-4' : 'pb-6'}`}>
      {expaned && <>
        <Box p="4" flex justifyContent="center">Pizza</Box>
        <hr />
        <Title size="small" className="mx-6 my-4">Chi tiết</Title>
        <hr />
        <CartDetail />
        <hr />
      </>}
      <Box m="0" px="6" mt="6" flex justifyContent="space-between">
        <Title bold size="small">Tổng cộng ({cart.items.length} món)</Title>
        <Text className="ml-6 text-orange-500 mb-0" size="xlarge" bold><Price amount={total} /></Text>
      </Box>
      <Box m="0" px="6" pt="6">
        <Button large fill responsive className="rounded-xl" onClick={expaned ? book : nextStep}>
          {expaned ? <span>Đặt bàn với thực đơn</span> : <span>Tiếp theo</span>}
        </Button>
      </Box>
    </div>
    <Box m="0" px="6" pb="6">
      <Button onClick={payFoods} large fill responsive className="rounded-xl" typeName="secondary">Chỉ đặt món ăn</Button>
    </Box>
  </Sheet>;
}

export default CartPreview;