const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const modelRecipe = require("../models/recipeModel");

router.post("/unique", auth, async(req, res) => {
    try {
        if (req.payload.role == 'user') {
            let recipeData = await modelRecipe.getRecipe(req.body.recipeId);

            console.log(recipeData);

            return res
                .status(200)
                .json({ result: recipeData });

        } else {
            return res
                .status(403)
                .json({ message: "Vous n'avez pas les permissions necessaire" });
        }

    } catch (err) {
        return res
            .status(500)
            .json({ message: err.message });
    }
})

router.get("/favList", auth, async(req, res) => {
    try {
        if (req.payload.role == 'user') {
            let favlist = await modelRecipe.getFavorites(req.payload.username);

            return res
                .status(200)
                .json({ result: favlist });

        } else {
            return res
                .status(403)
                .json({ message: "Vous n'avez pas les permissions necessaire" });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: err.message });
    }
})

router.post("/setFav", auth, async(req, res) => {
    try {
        if (req.payload.role == 'user') {
            let working = await modelRecipe.setFav(req.body.favlist, req.payload.username);

            if (working) {
                return res
                    .status(200)
                    .json({ message: "Succes" });
            } else {
                return res
                    .status(400)
                    .json({ message: "Une erreur est survenue lors de l'enregistrement de la recette, veuillez reéssayer plus tard" });
            }
        } else {
            return res
                .status(403)
                .json({ message: "Vous n'avez pas les permissions necessaire" });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: err.message });
    }
})

router.get("/favorites", auth, async(req, res) => {
    try {
        if (req.payload.role == 'user') {
            let favlist = await modelRecipe.getFavorites(req.payload.username);
            let favslist = [];

            // console.log("fav list of " + req.payload.username);
            // console.log(favlist);

            if (favlist != false) {
                // console.log(await modelRecipe.getFavRecipe(favlist));

                favslist = await modelRecipe.getFavRecipe(favlist);

                if (favslist != false) {
                    return res
                        .status(200)
                        .json({ result: favslist });
                } else {
                    return res
                        .status(403)
                        .json({ message: "Aucun favoris trouvé" });
                }
            } else {
                return res
                    .status(403)
                    .json({ message: "Aucun favoris trouvé" });
            }
        } else {
            return res
                .status(403)
                .json({ message: "Vous n'avez pas les permissions necessaire" });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: err.message });
    }
})

router.post("/share", auth, async(req, res) => {
    try {
        if (req.payload.role == 'user') {
            let shared = await modelRecipe.shareRecipe(req.body.recipeName, req.body.recipeIngredients, req.body.recipeRecipe, req.body.nbPerson, req.payload.username);

            if (shared) {
                return res
                    .status(200)
                    .json({ message: "Enregistrement de la recette réussi" });
            } else {
                return res
                    .status(400)
                    .json({ message: "Une erreur est survenue lors de l'enregistrement de la recette, veuillez reéssayer plus tard" });
            }

        } else {
            return res
                .status(403)
                .json({ message: "Vous n'avez pas les permissions necessaire" });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: err.message });
    }
})

router.post("/search", auth, async(req, res) => {
    try {
        if (req.payload.role == 'user') {
            let searchList = await modelRecipe.collectRecipes(req.body.ingredientsList);

            if (searchList != false) {
                return res
                    .status(200)
                    .json({ result: searchList });
            } else {
                return res
                    .status(403)
                    .json({ message: "Aucune recette trouvé" });
            }

        } else {
            return res
                .status(403)
                .json({ message: "Vous n'avez pas les permissions necessaire" });
        }

    } catch (err) {
        return res
            .status(500)
            .json({ message: err.message });
    }
})

router.get("/ingredientsList", auth, async(req, res) => {
    try {
        if (req.payload.role == "user") {
            let ingredients = await modelRecipe.getIngredients();

            if (ingredients != false) {
                return res
                    .status(200)
                    .json({ result: ingredients });
            } else {
                return res
                    .status(404)
                    .json({ message: "Aucuns ingredients trouvé" });
            }

        } else {
            return res
                .status(403)
                .json({ message: "Vous n'avez pas les permissions necessaire" });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: err.message });
    }
})

module.exports = router;