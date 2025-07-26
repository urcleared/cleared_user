import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

// Create Supabase client with explicit schema
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public'
  }
});

// Database types (we'll expand these later)
export type UserRole = 'patient' | 'doctor' | 'nurse' | 'lab_tech' | 'pharmacist' | 'admin';

export interface User {
  id: string;
  email?: string;
  phone?: string;
  kakao_id?: string;
  google_id?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    lat?: number;
    lng?: number;
  };
  phone_verified: boolean;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface DoctorProfile {
  id: string;
  user_id: string;
  license_number: string;
  specialization: string[];
  hospital_name?: string;
  consultation_fee: number;
  bio?: string;
  years_of_experience?: number;
  is_active: boolean;
  service_radius_km: number;
  location?: any; // PostGIS geography type
  created_at: string;
}