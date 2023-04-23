const express = require("express");
const app = express();
const pool = require("./db");
var cors = require("cors");

app.use(express.json());
app.use(cors());

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

app.get("/find-reading", async (req, res) => {
    try {
        const { page, rpp, sortOrder, dateLowerLimit, dateUpperLimit } =
            req.body;

        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

        let orderQuery = sortOrder === "DESC" ? "descending" : "ascending";
        let offsetQuery = page * rpp;

        let dateQuery = null;

        if (dateLowerLimit && dateUpperLimit) {
            dateQuery = `datecreated > ${dateLowerLimit} AND datecreated < ${dateUpperLimit} `;
        } else if (dateLowerLimit) {
            dateQuery = `datecreated > ${dateLowerLimit} `;
        } else if (dateUpperLimit) {
            dateQuery = `datecreated < ${dateUpperLimit} `;
        }

        const newReading = await pool.query(
            `SELECT *
            FROM public.reading ${
                dateQuery && "Where " + dateQuery
            } orderby datecreated ${orderQuery} LIMIT ${rpp} OFFSET ${offsetQuery}`
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
