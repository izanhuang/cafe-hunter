export type Cafe = {
  id: string; // UUID
  address: string;
  city: string;
  createdAt: string; // ISO date string
  description?: string;
  geopoint?: {
    latitude: number;
    longitude: number;
  };
  hours?: Record<string, string>; // Example: { "mon": "8am - 5pm", "tue": "8am - 5pm", ... }
  name: string;
  googleMapsUrl?: string;
  websiteUrl?: string;
  phoneNumber?: string;
  updatedAt?: string;
};

export type Review = {
  id: string; // UUID
  atmosphere: number; // Seating/space out of 5
  createdAt: string; // ISO timestamp
  coffee: number; // Out of 5
  description?: string; // Optional free text
  food: number; // Out of 5
  isBusy: boolean;
  isCozy: boolean;
  isWorkFriendly: boolean; // Can you work from here?
  loudness: number; // Scale 1-5 (quiet to loud)
  rating: number; // Overall rating out of 5
  userId: string; // User ID of the reviewer
};
