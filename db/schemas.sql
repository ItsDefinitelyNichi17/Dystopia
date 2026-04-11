DROP TABLE users;
DROP TABLE cooldowns;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL,
    gold BIGINT DEFAULT 0,
    chance NUMERIC(5,3) DEFAULT 0.01,
    base_cooldown INT DEFAULT ((60 * 60) * 2),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cooldowns (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    command VARCHAR (50) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    UNIQUE(command, user_id)
);