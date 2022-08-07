const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    status: {
        type: String,
        default: "open",
        enum: ["open", "close"]
    },
    priority: {
        type: String,
        default: "low",
        enum: ["low", "medium", "high"]
    },
    assignedTo: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})


module.exports = mongoose.model("tickets", tickets);