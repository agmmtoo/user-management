DROP TYPE IF EXISTS event;
CREATE TYPE event AS ENUM ('create', 'update', 'delete');

CREATE TABLE IF NOT EXISTS userlogs (
    id bigserial PRIMARY KEY,
    created_at timestamp(0) with time zone NOT NULL DEFAULT NOW(),
    user_id bigint NOT NULL REFERENCES users,
    event event NOT NULL,
    data text NOT NULL
);