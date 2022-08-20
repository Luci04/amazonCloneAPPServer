const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


const auth = async (req, res, next) => {
    console.log(req.body);
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res.status(401).json({ msg: "No auth token, access denied" });

        const verified = jwt.verify(token,process.env.JWTTOKEN);
        if (!verified)
            return res.status(401).json({ error: "Token verification failed, authorization denide." });
            console.log(verified);

        req.user = verified.id;
        req.token = token;
        next();
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

module.exports = auth;