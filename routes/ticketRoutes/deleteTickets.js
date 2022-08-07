const Tickets = require('../../models/tickets')
const Users = require('../../models/users')

let priorityValues = {
    "low": 1,
    "medium": 2,
    "high": 3
}

function getObjKey(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
}


module.exports = async(req, res) => {
    try {
        const { ticketID } = req.body

        if (!ticketID) {
            return res.json({
                success: false,
                msg: "Please provide all details. Ticket ID missing"
            })
        }

        if (req.decoded.role != 'admin') {
            return res.json({
                success: false,
                msg: "Unauthorized. Only admin can delete tickets."
            })
        }

        const ticket = await Tickets.findOne({ id: ticketID })
        if (!ticket) {
            return res.json({
                success: false,
                msg: "Ticket not found."
            })
        }


        //Delete ticket
        await Tickets.deleteOne({ id: ticketID })


        //If ticket was open then decreasing the ticket count for user
        if (ticket.status == "open") {
            await Users.findOneAndUpdate({ username: ticket.assignedTo }, { $inc: { ticketCount: -1 } })
        }

        return res.json({
            success: true,
            msg: "Ticket Deleted"
        })



    } catch (err) {
        return res.json({
            success: false,
            msg: err.message
        })
    }
}