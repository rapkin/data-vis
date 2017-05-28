CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(64) NOT NULL,
    password varchar(64) NOT NULL,
    is_admin boolean NOT NULL
);
CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    token varchar(64) NOT NULL,
    created varchar(64) NOT NULL,
    user_id integer NOT NULL,
    time timestamp,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name varchar(64) NOT NULL,
    lat float NOT NULL,
    lon float NOT NULL,
    user_id integer NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE data_sets (
    id SERIAL PRIMARY KEY,
    name varchar(64) NOT NULL,
    user_id integer NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE data_entries (
    id SERIAL PRIMARY KEY,
    set_id integer NOT NULL,
    location_id integer NOT NULL,
    value varchar(64) NULL,
    time int NOT NULL,
    user_id integer NOT NULL,
    FOREIGN KEY (set_id) REFERENCES data_sets(id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

