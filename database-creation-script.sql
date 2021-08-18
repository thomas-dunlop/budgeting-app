CREATE TABLE envelope (
    id SERIAL PRIMARY KEY,
    env_name varchar(50) UNIQUE, 
    env_budget decimal,
    env_money decimal
);

CREATE TABLE transaction (
    id SERIAL PRIMARY KEY,
    env_id integer REFERENCES envelope(id),
    amount decimal,
    recipient text
)

