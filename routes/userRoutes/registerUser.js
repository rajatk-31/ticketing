const Users = require('../../models/users')
const jwt = require('jsonwebtoken')

module.exports = async(req, res) => {
    try {
        const { username, role } = req.body;

        //checking body parameteres
        if (!username || !role) {
            return res.json({
                success: false,
                msg: "Please provide all details. Username / Role missing."
            })
        }

        const checkUser = await Users.findOne({ username });

        //check if same username exists
        if (checkUser) {
            return res.json({
                success: false,
                msg: "User with same username already exists"
            })
        }

        //save user
        let savedUser = await new Users({
            username,
            role
        }).save();

        //Generating token
        let payload = {
            username,
            role,
            _id: savedUser._id
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