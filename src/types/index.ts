
export interface StudySpot {
  id: string;
  name: string;
  address: string;
  type: 'cafe' | 'library' | 'coworking';
  distance: string;
  image: string;
  rating: number;
  wifiSpeed: number;
  noiseLevel: 'quiet' | 'moderate' | 'loud';
  seatStatus: 'available' | 'limited' | 'full';
  powerOutlets: number;
  acStatus: 'working' | 'not working';
  openHours: string;
  menu?: MenuItem[];
  lat: number;
  lng: number;
}

export interface MenuItem {
  name: string;
  price: number;
  category: 'coffee' | 'food' | 'drink';
  available: boolean;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  text: string;
  date: string;
}
