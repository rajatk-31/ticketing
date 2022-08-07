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

        const ticket = await Tickets.findOne({ id: ticketID })
        if (!ticket) {
            return res.json({
                success: false,
                msg: "Ticket not found."
            })
        }

        //checking status of tickets
        if (ticket && ticket.status === 'close') {
            return res.json({
                success: false,
                msg: "Ticket already closed."
            })
        }

        if (req.decoded.role == 'admin' || req.decoded.username == ticket.assignedTo) {

            //Finding higher priority tickets
            let higherPriorityTickets = await Tickets.find({ staus: "open", priority: { $gt: ticket.priority } })
            console.log("-----", ticket.priority, higherPriorityTickets.length)
            if (higherPriorityTickets.length > 0) {

                //Returning higher priority tickets
                return res.json({
                    success: false,
                    msg: "A higher priority task remains to be closed.",
                    tickets: higherPriorityTickets.map(e => {
                        let x = e.toObject()
                        let pr = getObjKey(priorityValues, e.priority)
                        x.priority = pr
                        return x
                    })
                })
            }


            //Closing ticket
            await Tickets.findOneAndUpdate({ id: ticketID }, { $set: { status: "close" } })

            //Decrementing user ticket count
            await Users.findOneAndUpdate({ username: ticket.assignedTo }, { $inc: { ticketCount: -1 } })

            return res.json({
                success: true,
                msg: "Ticket Closed."
            })
        }


        //Return unauthorized if not same user or admin
        return res.status(401).json({
            success: false,
            msg: "Unauthorized"
        })

    } catch (err) {
        return res.json({
            success: false,
            msg: err.message
        })
    }
}