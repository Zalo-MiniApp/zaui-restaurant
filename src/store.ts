
import { createStore } from 'zmp-core/lite';
import { userInfo } from 'zmp-sdk';
import { District, Restaurant, Location } from './models';
import firstDemoImage from './static/images/1.png';
import secondDemoImage from './static/images/2.png';

interface StoreState {
  user: userInfo,
  position: Location
  restaurants: Restaurant[]
  districts: District[]
  selectedDistrict: number
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
        address: '12 Lê Thánh Tôn, Quận 1, Hồ Chí Minh',
        views: 100,
        image: firstDemoImage,
        hours: {
          opening: [9, 0, 'AM'],
          closing: [22, 0, 'PM']
        },
        days: {
          opening: 1,
          closing: 7
        },
        hotline: '021 666 888'
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
        image: secondDemoImage,
        hours: {
          opening: [9, 0, 'AM'],
          closing: [22, 0, 'PM']
        },
        days: {
          opening: 1,
          closing: 7
        },
        hotline: '021 666 888'
      }
    ]
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
    }
  },
  actions: {
    setUser({ state }, data: userInfo) {
      state.user = { ...state.user, ...data }
    }
  },
})

export default store;
