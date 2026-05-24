export type ServiceCategory = 'plumber' | 'electrician' | 'painter';

export interface Service {
  id: ServiceCategory;
  label: string;       // French
  labelAr: string;     // Arabic
  icon: string;
  color: string;
  count: number;
}

export interface Artisan {
  id: number;
  name: string;
  service: string;
  zone: string;
  rating: number;
  reviews: number;
  price: string;
  available: boolean;
  years: number;
  verified: boolean;
  phone?: string;
}

export interface BookingRequest {
  artisanId: number;
  date: string;
  slot: string;
  description: string;
  address: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
}

export interface Review {
  clientName: string;
  rating: number;
  text: string;
  date: string;
}
