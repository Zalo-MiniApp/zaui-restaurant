export interface Restaurant {
  id: number
  name: string
  districtId: number
  location: Location
  views: number
  image: string
  address: string
  hours: {
    opening: [number, number, 'AM' | 'PM'],
    closing: [number, number, 'AM' | 'PM'],
  },
  days: {
    opening: number
    closing: number
  },
  hotline: string,
  map: string
}

export interface District {
  id: number
  name: string
}

export interface Location {
  lat: number,
  long: number
}

export interface Menu {
  categories: Category[]
}

export interface Category {
  id: number
  name: string
  foods: Food[]
}

export interface Food {
  id: number
  name: string
  price: number
  description: string
  image: string
  categories: string[]
  extras: Extra[]
}

export interface Extra {
  key: string
  label: string
  options: {
    key: string
    label: string
  }[]
}

export interface Cart {
  items: {
    quantity: number
    food: Food
  }[]
}