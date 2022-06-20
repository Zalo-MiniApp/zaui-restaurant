export interface Restaurant {
  id: number;
  name: string;
  districtId: number,
  location: Location,
  views: number,
  image: string
}

export interface District {
  id: number
  name: string
}

export interface Location {
  lat: number,
  long: number
}