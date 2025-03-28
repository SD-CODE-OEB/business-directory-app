export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Contact {
  phone: string;
  email: string;
  website: string;
}

export interface SocialMedia {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  category: string[];
  address: Address;
  contact: Contact;
  socialMedia: SocialMedia;
  hours: BusinessHours[];
  features: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  verified: boolean;
  founded: string;
  priceRange: string;
}
