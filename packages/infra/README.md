# DMS Wasp-193b - Infra

## Prisma + Supabase

Create `prisma` user on Supabase by running the follow sql instructions replacing `custon_password` with a strong password:
```sql
-- CREATE CUSTOM USER
CREATE USER "prisma" WITH PASSWORD 'custom_password' BYPASSRLS CREATEDB;

-- EXTEND PRISMA'S PRIVILEGES TO POSTGRES (NECESSARY TO VIEW CHANGES IN DASHBOARD)
GRANT "prisma" TO "postgres";

-- GRANT IT NECESSARY PERMISSIONS OVER THE RELEVANT SCHEMAS (PUBLIC)
GRANT USAGE ON SCHEMA public TO prisma;
GRANT CREATE ON SCHEMA public TO prisma;
GRANT ALL ON ALL TABLES IN SCHEMA public TO prisma;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO prisma;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO prisma;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO prisma;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON ROUTINES TO prisma;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO prisma;
```

If you need to change the password, run the following sql instruction replacing `new_password` with a new strong one:
```sql
ALTER USER "prisma" WITH PASSWORD 'new_password';
``` 
