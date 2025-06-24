CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE tasks (
    content VARCHAR(2000),
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listId UUID REFERENCES lists
)