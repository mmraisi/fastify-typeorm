-- Create user table if not exists
CREATE TABLE IF NOT EXISTS users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
  user_first_name TEXT NOT NULL,
  user_last_name TEXT,
  user_email TEXT NOT NULL UNIQUE,
  user_password TEXT NOT NULL,
  user_age INT,
  date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  date_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Check if the trigger exists before creating it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'users_update_date_updated'
    ) THEN
        CREATE TRIGGER users_update_date_updated BEFORE
        UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_date_updated ();
    END IF;
END$$;
