import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "postgresmhb",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];
// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];

app.get("/", (req, res) => {
  db.query('SELECT * FROM items', function(err, result){
    items = result.rows;
    // console.log(result.rows);
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  })
  
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;

  db.query('INSERT INTO items (title) VALUES ($1)', [item], (err, result) => {
    // ... handle error or result
  });

  console.log(req.body);
  // items.push({ title: item });
  res.redirect("/");
});

app.post("/edit", (req, res) => {});

app.post("/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
