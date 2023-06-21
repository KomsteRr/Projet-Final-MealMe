const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");

const modelUser = require("../models/userModel");

router.post("/login", async(req, res) => {
    try {
        let areValid = await modelUser.areValidCredentials(req.body.username, req.body.password);

        // console.log("valid ? " + areValid);

        if (areValid) {
            let userData = await modelUser.getData(req.body.username);

            const payload = {
                id: userData.id,
                username: userData.username,
                role: userData.role,
                email: userData.email
            }

            const token = jwt.sign(payload, process.env.PRIVATE_KEY);
            console.log("user = " + req.body.username + ", token = " + token);

            return res
                .status(200)
                .json({ message: "authentification réussie", token: token });

        } else {
            return res
                .status(400)
                .json({ message: "Nom d'utilisateur ou Mot de passe incorrect" });
        }

    } catch (err) {
        return res
            .status(500)
            .json({ message: err.message })
    }
});

router.post("/register", async(req, res) => {
    try {
        let alreadyExist = await modelUser.alreadyExist(req.body.username, req.body.email);

        if (alreadyExist) {
            return res
                .status(403)
                .json({ message: "Ce Nom d'utilisateur ou email est soit déjà utilisé, soit invalide, veuillez le changer" });
        }


        if (req.body.password != req.body.confirmPassword) {
            return res
                .status(400)
                .json({ message: "Veuillez faire attention a bien mettre le même mot de passe dans les cases 'Mot de passe' et 'Confirmer le mot de passe'" });
        }

        var hash_password = await bcrypt.hash(req.body.password, 10);

        let created = await modelUser.newUser(req.body.username, hash_password, req.body.email);

        if (created) {
            return res
                .status(200)
                .json({ message: "Utilisateur créer" });
        } else {
            return res
                .status(400)
                .json({ message: "Une erreur est survenue lors de la creation de l'utilisateur, veuillez reéssayer plus tard" });
        }

    } catch (err) {
        return res
            .status(500)
            .json({ message: err.message })
    }
});

router.get("/profil", auth, async(req, res) => {
    try {
        // console.log(req.header);
        if (req.payload.role == "user") {
            let userData = await modelUser.getData(req.payload.username);

            return res
                .status(200)
                .json({ result: userData });
        } else {
            return res
                .status(403)
                .json({ message: "Vous n'avez pas les permissions necessaire" })
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: err.message });
    }
})

module.exports = router;