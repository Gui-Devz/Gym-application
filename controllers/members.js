const fs = require("fs")
const data = require("../data.json")

exports.post = (req, res) => {
    const urlEncoded = req.body
    const keys = Object.keys(urlEncoded)

    for (const key of keys) {
        if (req.body[key] == "") {
            return res.send("Fill all the Fields")
        }
    }

    let { avatar_url, name, gender, activities } = urlEncoded

    const lenghtOfMembers = data.members.length
    const id = Number(lenghtOfMembers + 1)

    data.members.push({
        id,
        avatar_url,
        name,
        gender,
        activities,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return "Error Writting file"

        return res.redirect(`members/${id}`)
    })
}

exports.show = (req, res) => {
    const { id } = req.params

    const findMember = data.members.find((member) => {
        if (member.id == id) return true
    })

    const member = {
        ...findMember,
        activities: findMember.activities.split(","),
    }

    return res.render("members/show", { member })
}
