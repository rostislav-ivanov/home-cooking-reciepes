const express = require("express");
const router = require("./router");
const configHandlebars = require("./config/configHandlebars");
const configExpress = require("./config/configExpress");
const configMongoose = require("./config/configMongoose");

const PORT = process.env.PORT || 3000;

async function start() {
  const app = express();
  await configMongoose();
  configHandlebars(app);
  configExpress(app);
  app.use(router);

  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}

start();
