ALTER TABLE userlogs DROP CONSTRAINT IF EXISTS userlogs_user_id_fkey;

ALTER TABLE userlogs ADD CONSTRAINT userlogs_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;