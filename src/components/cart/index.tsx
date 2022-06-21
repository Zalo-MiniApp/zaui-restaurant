import { Box, Button, Sheet, Text, Title, useStore } from "zmp-framework/react";
import { Cart } from "../../models";
import Notch from "../menu/notch";
import Price from "../Price";

function CartPreview() {
  const cart = useStore('cart') as Cart;
  const total = useStore('total') as number;

  return <Sheet opened={cart.items.length > 0} closeByBackdropClick={false} className="h-min border-t" swipeToStep onSheetStepOpen={() => alert('aka')}>
    <Notch color="#637875" />
    <Box m="0" px="6" pt="10" pb="1" flex justifyContent="space-between">
      <Title bold size="small">Tổng cộng ({cart.items.length} món)</Title>
      <Text className="ml-6 text-orange-500 mb-0" size="xlarge" bold><Price amount={total} /></Text>
    </Box>
    <Box m="0" p="6">
      <Button large fill responsive className="rounded-xl">Tiếp theo</Button>
    </Box>
  </Sheet>;
}

export default CartPreview;