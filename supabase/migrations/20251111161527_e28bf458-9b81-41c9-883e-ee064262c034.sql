-- Fix critical security issues in RLS policies

-- 1. Restrict profiles table - remove public read access for sensitive data
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Only allow users to view basic info of other profiles (name and avatar)
-- Full profile data only for own profile
CREATE POLICY "Users can view basic profile info"
ON public.profiles
FOR SELECT
USING (
  auth.uid() = id OR 
  public.has_role(auth.uid(), 'admin')
);

-- 2. Restrict athlete_profiles - sensitive personal data should not be public
DROP POLICY IF EXISTS "Anyone can view athlete profiles" ON public.athlete_profiles;

CREATE POLICY "Users can view own athlete profile"
ON public.athlete_profiles
FOR SELECT
USING (
  profile_id = auth.uid() OR
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'club')
);

-- 3. Add admin-only policies for sensitive operations
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all athlete profiles"
ON public.athlete_profiles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all club profiles"
ON public.club_profiles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all tryouts"
ON public.tryouts
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all applications"
ON public.applications
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- 4. Restrict application enumeration
CREATE POLICY "Prevent application enumeration"
ON public.applications
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM athlete_profiles
    WHERE athlete_profiles.id = applications.athlete_id
    AND athlete_profiles.profile_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM tryouts t
    JOIN club_profiles cp ON t.club_id = cp.id
    WHERE t.id = applications.tryout_id
    AND cp.profile_id = auth.uid()
  ) OR
  public.has_role(auth.uid(), 'admin')
);