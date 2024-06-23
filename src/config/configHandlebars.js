const path = require("path");
const handlebars = require("express-handlebars");

function configHandlebars(app) {
  app.set("view engine", "hbs");
  app.set("views", path.resolve("src", "views"));
  app.engine(
    "hbs",
    handlebars.engine({
      extname: "hbs",
    })
  );

  return app;
}

module.exports = configHandlebars;
