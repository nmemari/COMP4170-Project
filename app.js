import express from "express";
import pool from "./db.js";

const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'");
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pokemon');
        const partyList = result.rows;
        res.render('index.ejs', {
            headingText: "PokeParty",
            partyList: partyList,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving data from database');
    }
});

app.post("/add", async (req, res) => {
    try {
        const newName = req.body.newPokemon;
        await pool.query('INSERT INTO pokemon (name) VALUES ($1)', [newName]);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error adding data to database');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
