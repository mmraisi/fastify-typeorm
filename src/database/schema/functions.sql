-- Create a trigger function
CREATE OR REPLACE FUNCTION update_date_updated()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_updated = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;