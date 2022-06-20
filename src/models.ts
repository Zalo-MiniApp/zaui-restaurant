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
  hotline: string
}

export interface District {
  id: number
  name: string
}

export interface Location {
  lat: number,
  long: number
}