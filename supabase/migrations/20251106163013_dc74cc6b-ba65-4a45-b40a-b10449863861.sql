-- Allow users to insert their own role during signup
-- This policy allows a user to insert their own role ONCE
CREATE POLICY "Users can insert own role on signup" 
ON public.user_roles 
FOR INSERT 
TO authenticated
WITH CHECK (
  user_id = auth.uid() 
  AND NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = auth.uid()
  )
);