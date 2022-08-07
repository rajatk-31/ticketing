const Tickets = require('../../models/tickets')
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
        const { params, query } = req;
        //All tickets
        if (params && params.all && params.all == "all") {
            let allTickets = await Tickets.find({})
            return res.json({
                success: true,
                tickets: allTickets.map(e => {
                    e.priority = getObjKey(priorityValues, e.priority)
                })
            })

        }

        //Tickets Based on Filters
        if (query) {
            let searchQuery = {};
            if (query.status) {
                searchQuery.status = query.status
            }
            if (query.title) {
                searchQuery.title = query.title
            }
            if (query.priority) {
                searchQuery.priority = priorityValues[query.priority]
            }

            let allTickets = await Tickets.find(query)
            return res.json({
                success: true,
                tickets: allTickets.map(e => {
                    e.priority = getObjKey(priorityValues, e.priority)
                })
            })
        }

        return res.json({
            success: false,
            msg: "Please provide filters"
        })

    } catch (err) {
        return res.json({
            success: false,
            msg: err.message
        })
    }
}