-- Create user table
CREATE TABLE
  users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_first_name TEXT NOT NULL,
    user_last_name TEXT,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL,
    user_age INT,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

-- trigger date_updated
CREATE TRIGGER users_update_date_updated BEFORE
UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_date_updated ();