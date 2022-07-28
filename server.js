const app = require("./app");
const mongoose = require("mongoose");

const PORT = 3000;
const DB_URL =
  "mongodb://DmytroKhomenko:1234565@cluster1-shard-00-00.tj5db.mongodb.net:27017,cluster1-shard-00-01.tj5db.mongodb.net:27017,cluster1-shard-00-02.tj5db.mongodb.net:27017/?ssl=true&replicaSet=atlas-pdhpw5-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
