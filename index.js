const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()); // req => body

// ----------------routes

// post
app.post("/reading", async (req, res) => {
    try {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

        const { temperature, humidity, pressure, light, particles } = req.body;
        let data = [];
        data.push(temperature, humidity, pressure, light, particles);

        const newReading = await pool.query(
            `INSERT INTO "reading" ("temperature", "humidity", "pressure", "light", "particles") VALUES($1, $2, $3, $4, $5)`,
            data
        );
        return res.json(newReading.rows);
    } catch (error) {
        console.log(error);
    }
});

app.get("/latest-reading", async (req, res) => {
    try {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

        const newReading = await pool.query(
            `SELECT id, temperature, humidity, pressure, light, particles, datecreated
            FROM public.reading order by datecreated desc limit 1`
        );
        res.json(newReading.rows);
    } catch (error) {
        console.log(error);
    }
});

// get latest

app.listen(process.env.PORT || 9000, () => {
    console.log(`server is listening on port ${process.env.PORT || 9000}`);
});
