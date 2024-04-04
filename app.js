import path from 'path';
import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pool from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
            pokemon: {}
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

app.post("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const newName = req.body.newName;
        await pool.query('UPDATE pokemon SET name = $1 WHERE id = $2', [newName, id]);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating data in database');
    }
});

app.post("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM pokemon WHERE id = $1', [id]);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting data from database');
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
