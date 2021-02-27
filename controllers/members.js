const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')
const Intl = require('intl')
exports.index = (req, res) => {
    return res.render('members/index', { members: data.members })
}
exports.show = (req, res) => {
    //req.params.id = /:id/:members
    const { id } = req.params

    const foundmember = data.members.find((member) => {
        return member.id == id
    })

    if (!foundmember)
        return res.send("member not found")


    const member = {
        ...foundmember,
        age: age(foundmember.birth),
    }
    return res.render('members/show', { member })
}
exports.create = (req, res) => {
    return res.render('members/create')
}
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
    const id = Number(data.members.length + 1)



    data.members.push({
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

        return res.redirect('/members')
    })
    // return res.send(req.body)
}
exports.edit = (req, res) => {
    const { id } = req.params

    const foundmember = data.members.find((member) => {
        return member.id == id
    })

    if (!foundmember)
        return res.send("member not found")


    const member = {
        ...foundmember,
        birth: date(foundmember.birth)
    }

    return res.render('members/edit', { member })

}
exports.put = (req, res) => {
    const { id } = req.body
    let index = 0

    const foundmember = data.members.find((member, foundIndex) => {
        if (id == member.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundmember)
        return res.send(`member not found`)


    const member = {
        ...foundmember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)

    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err)
            return res.send("Write error")

        return res.redirect(`/members/${id}`)
    })
}
exports.delete = (req, res) => {
    const { id } = req.body
    const filteredmembers = data.members.filter((member) => {
        return member.id != id
    })

    data.members = filteredmembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("write file error")

        return res.redirect("/members")
    })
}