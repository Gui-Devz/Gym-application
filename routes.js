const express = require("express")
const routes = express.Router()
const fs = require("fs")
const instructors = require("./controllers/instructors")
const members = require("./controllers/members")
const data = require("./data.json")

//INSTRUCTOR ROUTES
routes.get("/", (req, res) => {
    return res.redirect("/instructors")
})
routes.get("/instructors", (req, res) => {
    return res.render("instructors/index", { instructors: data.instructors })
})
routes.get("/instructors/create", (req, res) => {
    return res.render("instructors/create")
})
routes.get("/instructors/:id", instructors.show)
routes.get("/instructors/:id/edit", instructors.edit)
routes.post("/instructors", instructors.post)
routes.put("/instructors", instructors.put)
routes.delete("/instructors", instructors.delete)

// MEMBERS ROUTES

routes.get("/members", (req, res) => {
    return res.render("layout")
})

routes.get("/members/create", (req, res) => {
    return res.render("members/create")
})

routes.get("/members/:id", members.show)
routes.get("/members/:id/edit", members.edit)

routes.post("/members", members.post)
routes.put("/members", members.put)

module.exports = routes
