import { Payment } from "zmp-sdk";
import api from 'zmp-sdk';
import { zmpready } from "zmp-framework/react";
import store from "../store";
import { Location } from "../models";

export const getUser = () => new Promise((resolve) => {
  api.getUserInfo({
    avatarType: 'small',
    success: ({ userInfo }) => {
      zmpready(() => {
        store.dispatch('setUser', userInfo).then(resolve);
      });
    }
  });
})

export const pay = (amount: number, description?: string) => new Promise((resolve, reject) => {
  Payment.createOrder({
    desc: description ?? 'Thanh toán cho ZMP Restaurant',
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

export const requestLocation = () => new Promise((resolve) => {
  api.getLocation({
    success: ({ latitude, longitude }) => {
      zmpready(() => {
        store.dispatch('setPosition', {
          lat: Number(latitude),
          long: Number(longitude),
        } as Location).then(resolve);
      })
    }
  })
})