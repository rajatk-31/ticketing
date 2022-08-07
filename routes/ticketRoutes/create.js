const Tickets = require('../../models/tickets')
const Users = require('../../models/users')
const mongoose = require('mongoose');


module.exports = async(req, res) => {
    try {
        let { title, description, assignedTo, priority } = req.body;

        if (!title || !description || !assignedTo) {
            return res.json({
                success: false,
                msg: "Incomplete details. Title / Description / assignedTo  missing"
            })
        }

        if (req.decoded.role.toLowerCase() != "admin") {
            return res.json({
                success: false,
                msg: "Only admin can generate ticket."
            })
        }

        //Updating ticket count for user
        await Users.findOneAndUpdate({ username: assignedTo }, { $inc: { ticketCount: 1 } })


        let data = {
            id: new mongoose.Types.ObjectId(),
            title,
            description
        }


        //If priority provided then add otherwise low
        if (priority) {
            let priorityValues = {
                "low": 1,
                "medium": 2,
                "high": 3
            }
            data.priority = priorityValues[priority.toLowerCase()]
        }


        //If assign to provided otherwise assigning to person who has least tickets assigned else empty
        if (assignedTo)
            data.assignedTo = assignedTo


        //saving data
        let savedTicket = await new Tickets(data).save()
        return res.json({
            success: true,
            "ticketID": savedTicket.id
        })

    } catch (err) {
        return res.json({
            success: false,
            msg: err.message
        })
    }
}