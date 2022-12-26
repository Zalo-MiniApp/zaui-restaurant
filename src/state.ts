import { atom, selector } from "recoil";
import { Booking, Cart, Location, Restaurant, TabType } from "./models";
import { calcCrowFliesDistance } from "./utils/location";
import sdk from "./utils/sdk";

export const loginState = selector({
  key: "login",
  get: () => sdk.login(),
});

export const userState = selector({
  key: "user",
  get: async ({ get }) => {
    await get(loginState);
    const { userInfo } = await sdk.getUserInfo({});
    return userInfo;
  },
});

export const retryLocationState = atom({
  key: "retryLocation",
  default: 0,
});

export const positionState = selector<Location | undefined>({
  key: "position",
  get: async ({ get }) => {
    try {
      const allow = get(retryLocationState);
      if (allow) {
        await get(loginState);
        const { latitude, longitude } = await sdk.getLocation({});
        return {
          lat: Number(latitude),
          long: Number(longitude),
        };
      }
    } catch (error) {
      return undefined;
    }
    return undefined;
  },
});

export const restaurantsState = selector<Restaurant[]>({
  key: "restaurants",
  get: () => [
    {
      id: 1,
      name: "Chi nhánh - Lê Thánh Tôn",
      districtId: 1,
      rating: 4.5,
      location: {
        lat: 10.776463610730223,
        long: 106.70098038648123,
      },
      address: "15A Lê Thánh Tôn, Quận 1, Hồ Chí Minh",
      views: 100,
      image:
        "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      hours: {
        opening: [9, 0, "AM"],
        closing: [22, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "0123 456 789",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.394868527438!2d106.70554879999999!3d10.781038700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f492daac79b%3A0x16e334e4778de0c1!2zMTVhIEzDqiBUaMOhbmggVMO0biwgQuG6v24gTmdow6ksIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1655781904560!5m2!1svi!2s",
    },
    {
      id: 2,
      name: "Chi nhánh - Trần Hưng Đạo",
      address: "15A Trần Hưng Đạo, Đa Kao, Quận 1, Hồ Chí Minh",
      districtId: 1,
      rating: 4.5,
      location: {
        lat: 10.755009040272618,
        long: 106.67897941334107,
      },
      views: 50,
      image:
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      hours: {
        opening: [9, 0, "AM"],
        closing: [22, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "0123 456 789",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.585876004013!2d106.69000821538795!3d10.766364992328358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1640b88ca3%3A0x8d9f87825b5b807!2zMTIxLzE1IMSQLiBUcuG6p24gSMawbmcgxJDhuqFvLCBQaMaw4budbmcgUGjhuqFtIE5nxakgTMOjbywgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1655782080310!5m2!1svi!2s",
    },
  ],
});

export const categoriesState = selector({
  key: "categories",
  get: () => ["Pizza", "Pasta", "Salad", "Sandwich", "Drink"],
});

export const menuState = selector({
  key: "menu",
  get: ({ get }) => {
    const categories = get(categoriesState);
    const foods = get(foodsState);
    return {
      categories: categories.map((category, index) => ({
        id: String(index),
        name: category,
        foods: foods.filter((food) => food.categories.includes(category)),
      })),
    };
  },
});

export const foodsState = selector({
  key: "foods",
  get: () => [
    {
      id: 1,
      name: "Daily Pizza",
      price: 400000,
      image:
        "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      categories: ["Pizza", "Pasta", "Salad", "Sandwich", "Drink"],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [
        {
          key: "cheese",
          label: "Thêm phô mai",
          selected: true,
        },
        {
          key: "no-onion",
          label: "Không hành",
          selected: false,
        },
        {
          key: "seafood",
          label: "Thêm hải sản",
          selected: false,
        },
      ],
      extras: [
        {
          key: "size",
          label: "Size (Khẩu phần)",
          options: [
            {
              key: "small",
              label: "Nhỏ",
            },
            {
              key: "medium",
              label: "Vừa",
              selected: true,
            },
            {
              key: "large",
              label: "To",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Prosciutto",
      price: 400000,
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      categories: ["Pizza"],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [
        {
          key: "cheese",
          label: "Thêm phô mai",
          selected: true,
        },
        {
          key: "no-onion",
          label: "Không hành",
          selected: false,
        },
        {
          key: "seafood",
          label: "Thêm hải sản",
          selected: false,
        },
      ],
      extras: [
        {
          key: "size",
          label: "Size (Khẩu phần)",
          options: [
            {
              key: "small",
              label: "Nhỏ",
            },
            {
              key: "medium",
              label: "Vừa",
              selected: true,
            },
            {
              key: "large",
              label: "To",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Prosciutto",
      price: 400000,
      image:
        "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80",
      categories: ["Pizza", "Drink"],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [
        {
          key: "cheese",
          label: "Thêm phô mai",
          selected: true,
        },
        {
          key: "no-onion",
          label: "Không hành",
          selected: false,
        },
        {
          key: "seafood",
          label: "Thêm hải sản",
          selected: false,
        },
      ],
      extras: [
        {
          key: "size",
          label: "Size (Khẩu phần)",
          options: [
            {
              key: "small",
              label: "Nhỏ",
            },
            {
              key: "medium",
              label: "Vừa",
              selected: true,
            },
            {
              key: "large",
              label: "To",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      name: "Daily Pizza",
      price: 400000,
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
      categories: ["Pizza", "Drink"],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [
        {
          key: "cheese",
          label: "Thêm phô mai",
          selected: true,
        },
        {
          key: "no-onion",
          label: "Không hành",
          selected: false,
        },
        {
          key: "seafood",
          label: "Thêm hải sản",
          selected: false,
        },
      ],
      extras: [
        {
          key: "size",
          label: "Size (Khẩu phần)",
          options: [
            {
              key: "small",
              label: "Nhỏ",
            },
            {
              key: "medium",
              label: "Vừa",
            },
            {
              key: "large",
              label: "To",
            },
          ],
        },
      ],
    },
  ],
});

export const keywordState = atom({
  key: "keyword",
  default: "",
});

export const districtsState = selector({
  key: "districts",
  get: () => [
    {
      id: 1,
      name: "Quận 1",
    },
    {
      id: 5,
      name: "Quận 5",
    },
    {
      id: 7,
      name: "Quận 7",
    },
    {
      id: 13,
      name: "Thủ Đức",
    },
  ],
});

export const selectedDistrictState = atom({
  key: "selectedDistrict",
  default: 1,
});

export const popularRestaurantsState = selector<Restaurant[]>({
  key: "popularRestaurants",
  get({ get }) {
    const restaurants = get(restaurantsState);
    const keyword = get(keywordState);
    const selectedDistrict = get(selectedDistrictState);
    return restaurants
      .filter((restaurant) =>
        restaurant.name.toLowerCase().includes(keyword.toLowerCase())
      )
      .filter(
        (restaurant) =>
          selectedDistrict === 0 || restaurant.districtId === selectedDistrict
      )
      .filter((restaurant) => restaurant.views >= 50);
  },
});

export const nearestRestaurantsState = selector<Restaurant[]>({
  key: "nearestRestaurants",
  get({ get }) {
    const restaurants = get(restaurantsState);
    const position = get(positionState);
    if (position) {
      return [...restaurants].sort((a, b) => {
        const aDistance = calcCrowFliesDistance(position, a.location);
        const bDistance = calcCrowFliesDistance(position, b.location);
        return aDistance - bDistance;
      });
    }
    return restaurants;
  },
});

export const currentRestaurantTabState = atom<TabType>({
  key: "currentRestaurantTab",
  default: "info",
});

export const cartState = atom<Cart>({
  key: "cart",
  default: {
    items: [],
  },
});

export const totalState = selector({
  key: "total",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.items.reduce(
      (total, item) => total + item.quantity * item.food.price,
      0
    );
  },
});

export const bookingsState = atom<Booking[]>({
  key: "bookings",
  default: [],
  effects: [
    ({ setSelf, getPromise }) => {
      // generate a demo booking item, can be safely deleted if you don't need it
      Promise.all([getPromise(restaurantsState), getPromise(foodsState)]).then(
        ([restaurants, foods]) => {
          setSelf((bookings) => [
            ...(Array.isArray(bookings) ? bookings : []),
            {
              id: "1234567890",
              restaurant: restaurants[0],
              cart: {
                items: [
                  {
                    quantity: 1,
                    food: foods[0],
                    note: "",
                  },
                  {
                    quantity: 2,
                    food: foods[1],
                    note: "Kèm ớt trái",
                  },
                ],
              },
              bookingInfo: {
                date: new Date(),
                hour: [20, 0, "PM"],
                table: "05",
                seats: 4,
              },
            },
          ]);
        }
      );
    },
  ],
});
