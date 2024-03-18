import express from "express"
import pg from "pg"

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        res.render('index.ejs', {

        });
    } catch (err) {
        console.log(err);
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

