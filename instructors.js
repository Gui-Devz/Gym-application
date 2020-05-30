const fs = require("fs")
const data = require("./data.json")

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
            return res.redirect("instructors/show")
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

    function age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        //2020 - 1997 = 23
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (
            month < 0 ||
            (month == 0 && today.getDate() < birthDate.getDate())
        ) {
            age = age - 1
        }

        return age
    }

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

//Atualizando
