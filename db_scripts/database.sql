CREATE DATABASE meteorological_station;

CREATE TABLE reading(
    id SERIAL PRIMARY KEY,
    temperature FLOAT,
    humidity FLOAT,
    pressure FLOAT,
    light FLOAT,
    particles FLOAT,
    datecreated TIMESTAMP
)