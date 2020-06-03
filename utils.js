module.exports = {
    age: function age(timestamp) {
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
    },

    formatBrowser: (timestamp) => {
        const date = new Date(timestamp)
        const day = `0${date.getDate()}`.slice(-2)
        const month = `0${date.getMonth() + 1}`.slice(-2)
        const year = `${date.getFullYear()}`

        return `${year}-${month}-${day}`
    },
}
