const Tickets = require('../../models/tickets')
const Users = require('../../models/users')



module.exports = async(req, res) => {
    try {
        const { title, description, assigneTo, priority } = req.body;

        if (!title || !description) {
            return res.json({
                success: false,
                msg: "Incomplete details. Title / Details missing"
            })
        }

        if (req.decoded.role.toLowerCase() != "admin") {
            return res.json({
                success: false,
                msg: "Only admin can generate ticket."
            })
        }

        if (!assigneTo) {
            const getLeast = await Users.findOne({}).sort({ ticketCount: 1 })
            if (getLeast) {
                assigneTo = getLeast.username;
                await Users.findOneAndUpdate({ username: assigneTo }, { $inc: { ticketCount: 1 } })
            }
        }

        let data = {
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
        if (assigneTo)
            data.assignedTo = assigneTo


        //saving data
        let savedTicket = await new Tickets(data).save()
        return res.json({
            success: true,
            id: savedTicket.id
        })

    } catch (err) {
        return res.json({
            success: false,
            msg: err.message
        })
    }
}