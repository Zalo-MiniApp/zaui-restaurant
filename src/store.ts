
import { createStore } from 'zmp-core/lite';
import { userInfo } from 'zmp-sdk';
import { District, Restaurant, Location, Menu, Food, Cart } from './models';
import restaurant1 from './static/images/restaurant/1.png';
import restaurant2 from './static/images/restaurant/2.png';
import food1 from './static/images/food/1.png';
import food2 from './static/images/food/2.png';
import food3 from './static/images/food/3.png';
import food4 from './static/images/food/4.png';

interface StoreState {
  user: userInfo,
  position: Location
  restaurants: Restaurant[]
  districts: District[]
  selectedDistrict: number
  categories: string[]
  foods: Food[]
  cart: Cart
}

const store = createStore<StoreState>({
  state: {
    user: {
      id: '',
      avatar: '',
      name: ''
    },
    position: {
      lat: 0,
      long: 0
    },
    districts: [{
      id: 1,
      name: 'Quận 1',
    }, {
      id: 5,
      name: 'Quận 5',
    },
    {
      id: 7,
      name: 'Quận 7',
    }, {
      id: 13,
      name: 'Thủ Đức'
    }],
    selectedDistrict: 1,
    restaurants: [
      {
        id: 1,
        name: 'Jolliboo - Lê Thánh Tôn',
        districtId: 1,
        location: {
          lat: 10.776463610730223,
          long: 106.70098038648123
        },
        address: '15A Lê Thánh Tôn, Quận 1, Hồ Chí Minh',
        views: 100,
        image: restaurant1,
        hours: {
          opening: [9, 0, 'AM'],
          closing: [22, 0, 'PM']
        },
        days: {
          opening: 1,
          closing: 7
        },
        hotline: '021 666 888',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.394868527438!2d106.70554879999999!3d10.781038700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f492daac79b%3A0x16e334e4778de0c1!2zMTVhIEzDqiBUaMOhbmggVMO0biwgQuG6v24gTmdow6ksIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1655781904560!5m2!1svi!2s'
      },
      {
        id: 2,
        name: 'Jolliboo - Trần Hưng Đạo',
        address: '15A Trần Hưng Đạo, Đa Kao, Quận 1, Hồ Chí Minh',
        districtId: 1,
        location: {
          lat: 10.755009040272618,
          long: 106.67897941334107
        },
        views: 50,
        image: restaurant2,
        hours: {
          opening: [9, 0, 'AM'],
          closing: [22, 0, 'PM']
        },
        days: {
          opening: 1,
          closing: 7
        },
        hotline: '021 666 888',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.585876004013!2d106.69000821538795!3d10.766364992328358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1640b88ca3%3A0x8d9f87825b5b807!2zMTIxLzE1IMSQLiBUcuG6p24gSMawbmcgxJDhuqFvLCBQaMaw4budbmcgUGjhuqFtIE5nxakgTMOjbywgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1655782080310!5m2!1svi!2s'
      }
    ],
    categories: ['Pizza', 'Pasta', 'Salad', 'Sandwich', 'Drink'],
    foods: [{
      id: 1,
      name: 'Daily Pizza',
      price: 400000,
      image: food1,
      categories: ['Pizza', 'Pasta', 'Salad', 'Sandwich', 'Drink'],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      extras: [{
        key: 'size',
        label: 'Size (Khẩu phần)',
        options: [{
          key: 'small',
          label: 'Nhỏ',
        }, {
          key: 'medium',
          label: 'Vừa',
          selected: true
        }, {
          key: 'large',
          label: 'To',
        }]
      }]
    }, {
      id: 2,
      name: 'Prosciutto',
      price: 400000,
      image: food2,
      categories: ['Pizza'],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      extras: [{
        key: 'size',
        label: 'Size (Khẩu phần)',
        options: [{
          key: 'small',
          label: 'Nhỏ',
        }, {
          key: 'medium',
          label: 'Vừa',
          selected: true
        }, {
          key: 'large',
          label: 'To',
        }]
      }]
    }, {
      id: 3,
      name: 'Prosciutto',
      price: 400000,
      image: food3,
      categories: ['Pizza', 'Drink'],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      extras: [{
        key: 'size',
        label: 'Size (Khẩu phần)',
        options: [{
          key: 'small',
          label: 'Nhỏ',
        }, {
          key: 'medium',
          label: 'Vừa',
          selected: true
        }, {
          key: 'large',
          label: 'To',
        }]
      }]
    }, {
      id: 4,
      name: 'Daily Pizza',
      price: 400000,
      image: food4,
      categories: ['Pizza', 'Drink'],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      extras: [{
        key: 'size',
        label: 'Size (Khẩu phần)',
        options: [{
          key: 'small',
          label: 'Nhỏ',
        }, {
          key: 'medium',
          label: 'Vừa',
        }, {
          key: 'large',
          label: 'To',
        }]
      }]
    }],
    cart: {
      items: []
    }
  },
  getters: {
    user({ state }) {
      return state.user
    },
    restaurants({ state }) {
      return state.restaurants;
    },
    populars({ state }) {
      return state.restaurants.filter(restaurant => restaurant.views >= 50);
    },
    nearests({ state }) {
      const res = [...state.restaurants];
      res.sort((a, b) => {
        const aDistance = Math.sqrt(Math.pow(a.location.lat - state.position.lat, 2) + Math.pow(a.location.long - state.position.long, 2));
        const bDistance = Math.sqrt(Math.pow(b.location.lat - state.position.lat, 2) + Math.pow(b.location.long - state.position.long, 2));
        return aDistance - bDistance;
      });
      return res;
    },
    selectedDistrict({ state }) {
      return state.selectedDistrict;
    },
    districts({ state }) {
      return state.districts;
    },
    position({ state }) {
      return state.position;
    },
    foods({ state }) {
      return state.foods;
    },
    menu({ state }): Menu {
      return {
        categories: state.categories.map((category, index) => ({
          id: index,
          name: category,
          foods: state.foods.filter(food => food.categories.includes(category))
        }))
      }
    },
    cart({ state }) {
      return state.cart;
    },
    total({ state }) {
      return state.cart.items.reduce((total, item) => total + item.quantity * item.food.price, 0);
    }
  },
  actions: {
    setUser({ state }, data: userInfo) {
      state.user = { ...state.user, ...data }
    },
    addToCart({ state }, { cartItemIndex, ...item }: { food: Food, quantity: number, cartItemIndex?: number }) {
      if (cartItemIndex) {
        state.cart.items[cartItemIndex] = item;
      } else {
        state.cart.items.push(item);
      }
      state.cart = { ...state.cart };
    }
  },
})

export default store;
