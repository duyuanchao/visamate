-- Create KV store table for file storage
CREATE TABLE IF NOT EXISTS kv_store_54a8f580 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add an index for better performance
CREATE INDEX IF NOT EXISTS idx_kv_store_54a8f580_key ON kv_store_54a8f580(key);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER IF NOT EXISTS update_kv_store_54a8f580_updated_at 
    BEFORE UPDATE ON kv_store_54a8f580 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON kv_store_54a8f580 TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON kv_store_54a8f580 TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON kv_store_54a8f580 TO anon;