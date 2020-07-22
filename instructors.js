const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')
const Intl = require('intl')

//show 
exports.show = (req, res) => {
    //req.params.id = /:id/:members
    const { id } = req.params

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id
    })

    if (!foundInstructor)
        return res.send("instructor not found")


    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at)
    }
    return res.render('instructors/show', { instructor })
}

//create
exports.post = (req, res) => {

    const keys = Object.keys(req.body)
    for (let key of keys) {
        if (req.body[key] == '') {
            return res.send('Please, fulfill all fields')
        }
    }
    let { avatar_url, birth, name, services, gender } = req.body

    birth = Date.parse(birth)
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

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return res.send("Write file error")
        }

        return res.redirect('/instructors')
    })
    // return res.send(req.body)
}

//edit
exports.edit = (req, res) => {
    const { id } = req.params

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id
    })

    if (!foundInstructor)
        return res.send("instructor not found")


    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    return res.render('instructors/edit', { instructor })

}

//detele