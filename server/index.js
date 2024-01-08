const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
//Midlleware
app.use(bodyParser.json());
app.use(cors());

const posts = require("./routes/api/posts");
app.use('/api/posts',posts)

const port = process.env.PORT | 5000;


app.get('/',(req,res)=>{
    res.send('Hello')
})


app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
