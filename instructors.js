const fs = require("fs")
const data = require("./data.json")
const { age, formatBrowser } = require("./utils")

//Create
exports.post = (req, res) => {
    //{"link":"https://google.com","name":"sasaasa","gender":"M","birth":"1211-12-21"}
    const urlEncoded = req.body

    const keys = Object.keys(urlEncoded)

    for (const key of keys) {
        if (req.body[key] == "") {
            return res.send("Fill all the fields")
        }
    }

    let { avatar_url, birth, name, services, gender } = req.body

    birth = Date.parse(req.body.birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,
    })

    fs.writeFile("./data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return res.send("Writing file failed!")
        } else {
            //return res.redirect("/instructors")
            return res.redirect(`instructors/${id}`)
        }
    })
}

//show
exports.show = (req, res) => {
    const { id } = req.params

    const findInstructor = data.instructors.find((instructor) => {
        return instructor.id == id
    })

    if (!findInstructor) return res.send("Instructor not found!")

    const options = { day: "numeric", month: "long", year: "numeric" }

    const instructor = {
        ...findInstructor,
        age: age(findInstructor.birth),
        services: findInstructor.services.split(","),
        created_at: Intl.DateTimeFormat("en-GB", options).format(
            findInstructor.created_at
        ),
    }

    return res.render("instructors/show", { instructor })
}

//Alterando dados

exports.edit = (req, res) => {
    const { id } = req.params

    const findInstructor = data.instructors.find((instructor) => {
        return instructor.id == id
    })

    if (!findInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...findInstructor,
        age: formatBrowser(findInstructor.birth),
    }

    return res.render("instructors/edit", { instructor })
}

//Salvando dados alterados

exports.put = (req, res) => {
    const { id } = req.body

    let index = 0

    const findInstructor = data.instructors.find((instructor, foundIndex) => {
        if (instructor.id == id) {
            index = foundIndex

            return true
        }
    })

    if (!findInstructor) return res.send("Instructor not found!")

    instructor = {
        ...findInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return "Error Write File!"

        return res.redirect(`/instructors/${instructor.id}`)
    })
}

//Delete instructor function

exports.delete = (req, res) => {
    const { id } = req.body

    const findInstructor = data.instructors.find((instructor) => {
        return instructor.id == id
    })

    if (!findInstructor) return res.send("Instructor not found!")

    let filterOfInstructorsDeleted = data.instructors.filter((instructor) => {
        if (instructor.id != id) return true

        return false
    })

    data.instructors = filterOfInstructorsDeleted

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Error Write File!")

        return res.redirect("instructors")
    })
}
