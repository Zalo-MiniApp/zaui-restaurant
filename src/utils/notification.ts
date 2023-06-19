import { showToast } from "zmp-sdk";

export const message = (s: string) => {
  showToast({
    message: s,
  });
};
