CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name varchar(64) NOT NULL,
    lat float NOT NULL,
    lon float NOT NULL
);

CREATE TABLE data_sets (
    id SERIAL PRIMARY KEY,
    name varchar(64) NOT NULL
);

CREATE TABLE data_entries (
    id SERIAL PRIMARY KEY,
    set_id integer NOT NULL,
    city_id integer NOT NULL,
    value varchar(64) NULL,
    time int NOT NULL,
    FOREIGN KEY (set_id) REFERENCES data_sets(id) ON DELETE CASCADE,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
);
