CREATE DATABASE meteorological_station;

CREATE TABLE reading(
    id SERIAL PRIMARY KEY,
    temperature FLOAT,
    humidity FLOAT,
    pressure FLOAT,
    light FLOAT,
    windSpeed FLOAT,
    particles FLOAT,
    windDirection VARCHAR(6),
    rain FLOAT,
    datecreated TIMESTAMP
)

SELECT id, temperature, humidity, pressure, light, particles, datecreated
FROM public.reading order by datecreated desc limit 1;

drop table reading 