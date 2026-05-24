import { Artisan, Service } from './types';

export const SERVICES: Service[] = [
  { id: 'plumber',      label: 'Plombier',     labelAr: 'سبّاك',    icon: 'droplet', color: '#5A8CE0', count: 23 },
  { id: 'electrician',  label: 'Électricien',  labelAr: 'كهربائي',  icon: 'zap',     color: '#E8A249', count: 18 },
  { id: 'painter',      label: 'Peintre',      labelAr: 'صبّاغ',    icon: 'tool',    color: '#4CAF7D', count: 15 },
];

export const ARTISANS: Artisan[] = [
  { id: 1, name: 'Mohamed Sassi',   service: 'Plombier',    zone: 'Ariana',        rating: 4.8, reviews: 34, price: '30–60 TND',   available: true,  years: 12, verified: true,  phone: '+216 22 345 678' },
  { id: 2, name: 'Bilel Trabelsi',  service: 'Électricien', zone: 'La Marsa',      rating: 4.6, reviews: 21, price: '40–80 TND',   available: true,  years: 8,  verified: true,  phone: '+216 25 678 901' },
  { id: 3, name: 'Hatem Jebali',    service: 'Peintre',     zone: 'Bardo',         rating: 4.9, reviews: 47, price: '50–120 TND',  available: false, years: 15, verified: true,  phone: '+216 20 111 222' },
  { id: 4, name: 'Riadh Ben Ali',   service: 'Plombier',    zone: 'Tunis Centre',  rating: 4.4, reviews: 12, price: '25–50 TND',   available: true,  years: 6,  verified: false, phone: '+216 29 333 444' },
];
