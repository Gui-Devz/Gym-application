const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
  return res.render("layout");
});

routes.get("/portfolio", (req, res) => {
  return res.render("portfolio");
});

module.exports = routes;
