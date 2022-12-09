
import { atom } from "recoil";
import { userInfo } from 'zmp-sdk';

export const userState = atom<userInfo>({
  key: "user",
  default: {
    id: '12345678',
    name: 'Zalo',
    avatar: 'ZA',
  }
})
