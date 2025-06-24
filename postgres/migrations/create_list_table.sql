CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE lists (
    name VARCHAR(200),
    id UUID PRIMARY KEY DEFAULT gen_random_uuid()
)