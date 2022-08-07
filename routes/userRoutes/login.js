const Users = require('../../models/users')
const jwt = require('jsonwebtoken')

module.exports = async(req, res) => {
    try {
        const { username } = req.body;

        //checking body parameteres
        if (!username) {
            return res.json({
                success: false,
                msg: "Please provide all details. Username missing."
            })
        }

        const user = await Users.findOne({ username });

        if (!user) {
            return res.json({
                success: false,
                msg: "User not found."
            })
        }

        //Generating token
        let payload = {
            username,
            role: user.role,
            _id: user._id
        };
        const token = jwt.sign(payload, process.env.SECRET);

        return res.json({
            success: true,
            "Auth Token": token
        })

    } catch (err) {
        console.log(err)
        return res.json({
            success: false,
            msg: err.message
        })
    }
}