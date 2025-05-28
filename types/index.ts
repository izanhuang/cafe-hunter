export type Cafe = {
  id: string; // UUID
  name: string;
  description?: string; // Optional description
  address: string;
  city: string;
  state: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  google_maps_url?: string;
  website_url?: string;
  phone_number?: string;
  hours?: Record<string, string>; // Example: { "mon": "8am - 5pm", "tue": "8am - 5pm", ... }
  created_at: string; // ISO date string
  updated_at?: string; // Optional
};

export type Review = {
  id: string; // UUID
  cafe_id: string; // Foreign key to Cafe
  user_name?: string; // Optional, only if user is logged in
  email?: string; // Optional, only if user is logged in
  rating: number; // Overall rating out of 5
  recommend: boolean; // Would you recommend this cafe?
  is_cozy: boolean;
  is_busy: boolean;
  coffee_rating: number; // Out of 5
  food_rating: number; // Out of 5
  space_rating: number; // Seating/space out of 5
  work_friendly: boolean; // Can you work from here?
  loudness: number; // Scale 1-5 (quiet to loud)
  description?: string; // Optional free text
  created_at: string; // ISO timestamp
};
