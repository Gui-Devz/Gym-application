const express = require("express")
const routes = express.Router()

routes.get("/", (req, res) => {
    return res.render("index")
})

routes.get("/portfolio", (req, res) => {
    return res.redirect("/")
})

module.exports = routes
