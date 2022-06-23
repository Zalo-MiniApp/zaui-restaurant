import { Payment } from "zmp-sdk";


export const pay = (amount: number, description?: string) => new Promise((resolve, reject) => {
  Payment.createOrder({
    desc: description ?? 'Thanh toán cho Nhà hàng Joliboo',
    item: [],
    amount: amount,
    success: (data) => {
      resolve(data);
    },
    fail: (err) => {
      reject(err);
    },
  });
})