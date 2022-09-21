const express = require("express");
const router = express.Router();

let routes = (app) => {
  router.get("/", (req, res) => {
    return res.render("homepage.ejs");
  });
  app.use(router);
};
module.exports = routes;