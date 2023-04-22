const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()); // req => body

// ----------------routes

// post
app.post("/reading", async (req, res) => {
    console.log("stigao sam");
    try {
        const {
            temperature,
            humidity,
            pressure,
            light,
            particles,
            datecreated,
        } = req.body;

        const newReading = await pool.query(
            "INSERT INTO public.reading (temperature, humidity, pressure, light, particles, datecreated) VALUES($0, $1, $2, $3, $4) RETURNING *",
            [temperature, humidity, pressure, light, particles, datecreated]
        );

        console.log(newReading);
        res.json(newReading.rows)
    } catch (error) {
        console.log(error);
    }
});

// get latest

app.listen(process.env.PORT || 9000, () => {
    console.log("server is listening on port 8080");
});
