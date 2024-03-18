import express from "express"
import pg from "pg"

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let party = [];

app.get("/", async (req, res) => {
    try {
        res.render('index.ejs', {
            headingText: "PokeParty",
            partyList: party,
        });
    } catch (err) {
        console.log(err);
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

