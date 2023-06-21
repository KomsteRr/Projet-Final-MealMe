const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    try {
        console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];


        jwt.verify(token, process.env.PRIVATE_KEY, (err, payload) => {
            if (err) {
                return res
                    .status(401)
                    .json({ message: "vous devez être connecté" });
            }

            console.log(token);

            req.payload = payload;
            console.log("payload :");
            console.log(payload);
            next();
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = auth;