const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const res = require("express/lib/response");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;

// user : GeniusCar pass : s5WgVw7W1Qnknsdo

app.use(cors());
app.use(express.json());

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.BD_PASS}@cluster0.khmoc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();

    const services = client.db("GeniusCar").collection("services");

    //get all data from db
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = services.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
    //   client.close()
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello From Genius Car Service");
});

app.listen(port, () => {
  console.log("Genius Car Service CRUD is Running....in port ", port);
});
