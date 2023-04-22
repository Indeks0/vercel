const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()); // req => body

// ----------------routes

// post
app.post("/reading", async (req, res) => {
    try {
        const { temperature, humidity, pressure, light, particles } = req.body;

        let data = [];
        data.push(temperature, humidity, pressure, light, particles);
        const newReading = await pool.query(
            `INSERT INTO "reading" ("temperature", "humidity", "pressure", "light", "particles") VALUES($1, $2, $3, $4, $5)`,
            data
        );
        res.json(newReading.rows);
    } catch (error) {
        console.log(error);
    }
});

// get latest

app.listen(process.env.PORT || 9000, () => {
    console.log("server is listening on port 8080");
});
