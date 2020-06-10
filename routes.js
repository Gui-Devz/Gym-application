const express = require("express")
const routes = express.Router()
const fs = require("fs")
const instructors = require("./instructors")
const data = require("./data.json")

routes.get("/", (req, res) => {
    return res.redirect("/instructors")
})

routes.get("/instructors", (req, res) => {
    return res.render("instructors/index", { instructors: data.instructors })
})

routes.get("/members", (req, res) => {
    return res.send("members")
})

routes.get("/instructors/create", (req, res) => {
    return res.render("instructors/create")
})

routes.get("/instructors/:id", instructors.show)

routes.get("/instructors/:id/edit", instructors.edit)

routes.post("/instructors", instructors.post)

routes.put("/instructors", instructors.put)

routes.delete("/instructors", instructors.delete)

module.exports = routes
