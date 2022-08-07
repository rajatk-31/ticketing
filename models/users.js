const mongoose = require("mongoose");
const { Schema } = mongoose;

const users = new Schema({
    username: {
        unique: true,
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "employee"]
    },
    ticketCount: {
        type: Number,
        default: 0
    }
})


users.index({ username: 1 });

module.exports = mongoose.model("users", users);