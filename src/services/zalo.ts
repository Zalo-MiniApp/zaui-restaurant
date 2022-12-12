import { Payment } from "zmp-sdk";
import { getConfig } from "../components/config-provider";

export const pay = (amount: number, description?: string) => new Promise((resolve, reject) => {
  Payment.createOrder({
    desc: description ?? `Thanh toán cho ${getConfig(c => c.app.title)}`,
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