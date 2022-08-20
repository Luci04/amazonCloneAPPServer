const express = require("express");
const User = require("../models/user");
const auth = require("../middlewares/auth")
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const authRouter = express.Router();
dotenv.config();

authRouter.post("/api/signup", async (req, res) => {
    try {
        console.log(res.body);
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User with same email already exists!" });
        }

        const hashedPassword = await bcryptjs.hash(password, 8);

        let user = new User({
            email,
            password: hashedPassword,
            name
        });
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


authRouter.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User with this email does not exist!" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWTTOKEN);
        res.json({ token, ...user._doc });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

authRouter.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        console.log(token);
        if (!token) return res.json(false);
        const verified = jwt.verify(token, process.env.JWTTOKEN);
        if (!verified) return res.json(false);
        const user = await User.findById(verified.id);
        if (!user) return res.json(false);
        res.json(true);
      } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message });
      }
});


authRouter.get("/", auth, async (req, res) =>{
    console.log(req.user);
    const user = await User.findById(req.user);
    console.log(user);
    res.json({...user._doc, token: req.token});
})


module.exports = authRouter;


// restart
// env
// validation