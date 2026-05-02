DROP TABLE cooldowns;
DROP TABLE users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL,
    gold BIGINT DEFAULT 0,
    rarity_chance NUMERIC(5,3) DEFAULT 0.00,
    loot_chance NUMERIC(5,3) DEFAULT 0.00,
    base_cooldown INT DEFAULT ((60 * 60) * 4),
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT check_gold CHECK(gold <= 99999),
    CONSTRAINT rarity_check CHECK(rarity_chance <= 0.012),
    CONSTRAINT loot_check CHECK(loot_chance <= 0.012),
    CONSTRAINT cooldown_check CHECK(base_cooldown <= 28800)
);

 CREATE TABLE cooldowns (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    command VARCHAR (50) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    UNIQUE(command, user_id)
);

# TESTING

UPDATE users 
    SET 
        rarity_chance = rarity_chance + 0.002,
        loot_chance = loot_chance + 0.002,
        base_cooldown = base_cooldown - 300
    WHERE user_id = '' AND username = ''

UPDATE users 
    SET 
       gold = gold + 8888
    WHERE user_id = '' AND username = ''