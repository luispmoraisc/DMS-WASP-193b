DO $main$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'auth') AND
    EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'storage') THEN
      -- Create storage bucket for documents
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'documents',
      'documents',
      false,
      52428800, -- 50MB limit
      ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/plain', 'text/csv']
    ) ON CONFLICT (id) DO NOTHING;

    -- Create storage bucket for thumbnails
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'thumbnails',
      'thumbnails',
      true,
      5242880, -- 5MB limit
      ARRAY['image/jpeg', 'image/png', 'image/webp']
    ) ON CONFLICT (id) DO NOTHING;

    -- Storage policies for documents bucket
    CREATE POLICY "Users can upload their own documents"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);

    CREATE POLICY "Users can view their own documents"
    ON storage.objects FOR SELECT
    TO authenticated
    USING (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);

    CREATE POLICY "Users can delete their own documents"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);

    -- Storage policies for thumbnails bucket
    CREATE POLICY "Users can upload their own thumbnails"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'thumbnails' AND (storage.foldername(name))[1] = auth.uid()::text);

    CREATE POLICY "Anyone can view thumbnails"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'thumbnails');

    CREATE POLICY "Users can delete their own thumbnails"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'thumbnails' AND (storage.foldername(name))[1] = auth.uid()::text);

    -- Enable Row Level Security
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
    ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
    ALTER TABLE files ENABLE ROW LEVEL SECURITY;
    ALTER TABLE processing_jobs ENABLE ROW LEVEL SECURITY;
    ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
  
  RAISE NOTICE 'Configuração do Supabase (Auth e Storage) aplicada com sucesso.';
  ELSE
      RAISE NOTICE 'Esquemas auth ou storage não encontrados. Pulando configuração.';
  END IF;
END $main$;