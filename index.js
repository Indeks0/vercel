const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()); // req => body

// ----------------routes

// post
app.post("/reading", async (req, res) => {
    try {
        const {
            temperature,
            humidity,
            pressure,
            light,
            particles,
            datecreated,
        } = req.body;

        console.log([
            temperature,
            humidity,
            pressure,
            light,
            particles,
            datecreated,
        ]);
        const newReading = await pool.query(
            "INSERT INTO public.reading (temperature, humidity, pressure, light, particles, datecreated) VALUES($0, $1, $2, $3, $4, $5) RETURNING *",
            [temperature, humidity, pressure, light, particles, datecreated]
        );

        console.log(newReading);
        res.json(newReading.rows);
    } catch (error) {
        console.log(error);
    }
});

// get latest

app.listen(process.env.PORT || 9000, () => {
    console.log("server is listening on port 8080");
});
