const mongoose = require("mongoose");
const { Schema } = mongoose;


/**
 * Priority
 * 1 - Low
 * 2 - Medium
 * 3 - High
 */
const tickets = new Schema({
    id: {
        unique: true,
        type: Schema.Types.ObjectId,
        required: true,
        default: new mongoose.Types.ObjectId()
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: "open",
        enum: ["open", "close"]
    },
    priority: {
        type: Number,
        min: 1,
        max: 3,
        default: 1
    },
    assignedTo: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

tickets.index({ id: 1 });
module.exports = mongoose.model("tickets", tickets);