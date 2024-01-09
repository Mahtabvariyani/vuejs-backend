const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
//Midlleware
app.use(bodyParser.json());
app.use(cors());

const posts = require("./routes/api/posts");
app.use("/api/posts", posts);

//hanlde Production

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));
  app.get(/.*/,(req,res)=> res.sendFile(__dirname + '/public/index.html'))
}

const port = process.env.PORT | 5000;

app.get("/", (req, res) => {
  res.send("Hello");
});


app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
