const Users = require('../models/UsersModel')

module.exports = {

    async read(request, response){
        const usersList = await Users.find()
        return response.json(usersList)
    },

    async create(request, response){
        const { name, lastName } = request.body

        if(!name || !lastName){
            return response.status(400).json({
                error: "Imcomplete data."
            })
        }

        const userCreated = await Users.create({
            name,
            lastName
        })

        return response.json(userCreated)
    },

    async update(request, response){
        const { id } = request.params
        const { name, lastName } = request.body
        const user = await Users.findOne({_id: id})

        if(name || lastName){
            user.name = name ? name : user.name
            user.lastName = lastName ? lastName : user.lastName
            await user.save()
        }

        return response.json(user)
    },

    async delete(request, response){
        const { id } = request.params
        const user = await Users.findByIdAndDelete({_id: id})

        if(!user){
            return response.status(401).json({
                error: "Usuário não encontrado"
            })
        } else {
            response.json(user)
        }
    }
}