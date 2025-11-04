-- Create enum for user types
CREATE TYPE public.user_type AS ENUM ('athlete', 'club', 'admin');

-- Create enum for application status
CREATE TYPE public.application_status AS ENUM ('pending', 'approved', 'rejected');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  user_type public.user_type NOT NULL DEFAULT 'athlete',
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create athlete_profiles table
CREATE TABLE public.athlete_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  date_of_birth DATE,
  position TEXT,
  height_cm INTEGER,
  weight_kg INTEGER,
  preferred_foot TEXT,
  current_club TEXT,
  experience_years INTEGER,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create club_profiles table
CREATE TABLE public.club_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  club_name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  founded_year INTEGER,
  logo_url TEXT,
  description TEXT,
  website TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create tryouts table (peneiras)
CREATE TABLE public.tryouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id UUID NOT NULL REFERENCES public.club_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  tryout_date DATE NOT NULL,
  application_deadline DATE NOT NULL,
  total_spots INTEGER NOT NULL,
  available_spots INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create applications table (inscrições)
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tryout_id UUID NOT NULL REFERENCES public.tryouts(id) ON DELETE CASCADE,
  athlete_id UUID NOT NULL REFERENCES public.athlete_profiles(id) ON DELETE CASCADE,
  status public.application_status NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tryout_id, athlete_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.athlete_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tryouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Athlete profiles policies
CREATE POLICY "Anyone can view athlete profiles"
  ON public.athlete_profiles FOR SELECT
  USING (true);

CREATE POLICY "Athletes can update own profile"
  ON public.athlete_profiles FOR UPDATE
  USING (profile_id = auth.uid());

CREATE POLICY "Athletes can insert own profile"
  ON public.athlete_profiles FOR INSERT
  WITH CHECK (profile_id = auth.uid());

-- Club profiles policies
CREATE POLICY "Anyone can view club profiles"
  ON public.club_profiles FOR SELECT
  USING (true);

CREATE POLICY "Clubs can update own profile"
  ON public.club_profiles FOR UPDATE
  USING (profile_id = auth.uid());

CREATE POLICY "Clubs can insert own profile"
  ON public.club_profiles FOR INSERT
  WITH CHECK (profile_id = auth.uid());

-- Tryouts policies
CREATE POLICY "Anyone can view open tryouts"
  ON public.tryouts FOR SELECT
  USING (true);

CREATE POLICY "Clubs can insert tryouts"
  ON public.tryouts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.club_profiles
      WHERE id = club_id AND profile_id = auth.uid()
    )
  );

CREATE POLICY "Clubs can update own tryouts"
  ON public.tryouts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.club_profiles
      WHERE id = club_id AND profile_id = auth.uid()
    )
  );

CREATE POLICY "Clubs can delete own tryouts"
  ON public.tryouts FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.club_profiles
      WHERE id = club_id AND profile_id = auth.uid()
    )
  );

-- Applications policies
CREATE POLICY "Athletes can view own applications"
  ON public.applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.athlete_profiles
      WHERE id = athlete_id AND profile_id = auth.uid()
    )
  );

CREATE POLICY "Clubs can view applications for their tryouts"
  ON public.applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.tryouts t
      JOIN public.club_profiles cp ON t.club_id = cp.id
      WHERE t.id = tryout_id AND cp.profile_id = auth.uid()
    )
  );

CREATE POLICY "Athletes can insert applications"
  ON public.applications FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.athlete_profiles
      WHERE id = athlete_id AND profile_id = auth.uid()
    )
  );

CREATE POLICY "Clubs can update applications for their tryouts"
  ON public.applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.tryouts t
      JOIN public.club_profiles cp ON t.club_id = cp.id
      WHERE t.id = tryout_id AND cp.profile_id = auth.uid()
    )
  );

-- Create function to handle profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, user_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Novo Usuário'),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'user_type')::public.user_type, 'athlete')
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_athlete_profiles_updated_at
  BEFORE UPDATE ON public.athlete_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_club_profiles_updated_at
  BEFORE UPDATE ON public.club_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tryouts_updated_at
  BEFORE UPDATE ON public.tryouts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();