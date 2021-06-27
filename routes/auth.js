const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");


//register

router.post("/register", async (req, res) => {
    try {
        //hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        //new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name
        });
        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }

});
//login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }

})
router.get("/check", async (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json("Authenticated");
    } else {
        console.log("not authenticated")
        res.status(401).send("not autticated");
    }

})
//google lognn

module.exports = router;