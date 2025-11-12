-- Modificar a função handle_new_user para tornar o primeiro usuário admin automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  user_count integer;
  default_role app_role;
BEGIN
  -- Inserir o perfil do usuário
  INSERT INTO public.profiles (id, full_name, email, user_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Novo Usuário'),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'user_type')::public.user_type, 'athlete')
  );
  
  -- Verificar se é o primeiro usuário
  SELECT COUNT(*) INTO user_count FROM auth.users;
  
  -- Se for o primeiro usuário, torná-lo admin. Caso contrário, usar a role do metadata
  IF user_count = 1 THEN
    default_role := 'admin';
  ELSE
    default_role := COALESCE((NEW.raw_user_meta_data->>'user_type')::app_role, 'athlete');
  END IF;
  
  -- Inserir a role do usuário
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, default_role);
  
  RETURN NEW;
END;
$function$;