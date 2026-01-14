DO $main$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'auth') THEN
    -- Enable Row Level Security
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
    ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
    ALTER TABLE files ENABLE ROW LEVEL SECURITY;
    ALTER TABLE processing_jobs ENABLE ROW LEVEL SECURITY;
    ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

    -- RLS Policies for profiles
    CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
    CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
    CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

    -- RLS Policies for folders
    CREATE POLICY "Users can view their own folders" ON folders FOR SELECT USING (auth.uid() = user_id);
    CREATE POLICY "Users can create their own folders" ON folders FOR INSERT WITH CHECK (auth.uid() = user_id);
    CREATE POLICY "Users can update their own folders" ON folders FOR UPDATE USING (auth.uid() = user_id);
    CREATE POLICY "Users can delete their own folders" ON folders FOR DELETE USING (auth.uid() = user_id);

    -- RLS Policies for files
    CREATE POLICY "Users can view their own files" ON files FOR SELECT USING (auth.uid() = user_id);
    CREATE POLICY "Users can upload their own files" ON files FOR INSERT WITH CHECK (auth.uid() = user_id);
    CREATE POLICY "Users can update their own files" ON files FOR UPDATE USING (auth.uid() = user_id);
    CREATE POLICY "Users can delete their own files" ON files FOR DELETE USING (auth.uid() = user_id);

    -- RLS Policies for processing_jobs
    CREATE POLICY "Users can view their own jobs" ON processing_jobs FOR SELECT USING (auth.uid() = user_id);
    CREATE POLICY "Users can create their own jobs" ON processing_jobs FOR INSERT WITH CHECK (auth.uid() = user_id);
    CREATE POLICY "Users can update their own jobs" ON processing_jobs FOR UPDATE USING (auth.uid() = user_id);

    -- RLS Policies for notifications
    CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
    CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
    CREATE POLICY "Users can delete their own notifications" ON notifications FOR DELETE USING (auth.uid() = user_id);
    CREATE POLICY "Users can insert their own notifications" ON notifications FOR INSERT WITH CHECK (auth.uid() = user_id);

    -- Function to automatically create profile on signup
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER AS $handle_new_user$
    BEGIN
      INSERT INTO public.profiles (id, email, full_name)
      VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
      RETURN NEW;
    END;
    $handle_new_user$ LANGUAGE plpgsql SECURITY DEFINER;

    -- Trigger to create profile on signup
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

    -- Function to update storage used
    CREATE OR REPLACE FUNCTION update_storage_used()
    RETURNS TRIGGER AS $update_storage_used$
    BEGIN
      IF TG_OP = 'INSERT' THEN
        UPDATE profiles SET storage_used = storage_used + NEW.size WHERE id = NEW.user_id;
      ELSIF TG_OP = 'DELETE' THEN
        UPDATE profiles SET storage_used = storage_used - OLD.size WHERE id = OLD.user_id;
      END IF;
      RETURN NULL;
    END;
    $update_storage_used$ LANGUAGE plpgsql SECURITY DEFINER;

    -- Trigger to update storage on file changes
    DROP TRIGGER IF EXISTS on_file_storage_change ON files;
    CREATE TRIGGER on_file_storage_change
      AFTER INSERT OR DELETE ON files
      FOR EACH ROW EXECUTE FUNCTION update_storage_used();

    -- Enable realtime for notifications
    ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
    ALTER PUBLICATION supabase_realtime ADD TABLE files;
    ALTER PUBLICATION supabase_realtime ADD TABLE processing_jobs;

    RAISE NOTICE 'Configuração do Supabase (Auth e Storage) aplicada com sucesso.';
  ELSE
      RAISE NOTICE 'Esquemas auth ou storage não encontrados. Pulando configuração.';
  END IF;
END $main$;