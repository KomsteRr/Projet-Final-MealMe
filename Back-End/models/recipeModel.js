const pool = require("../utils/db");

async function getRecipe(recipeId) {
    try {
        var conn = await pool.getConnection();

        var sql = "SELECT * FROM recipes WHERE id = '" + recipeId + "'";

        const rows = await conn.query(sql);
        conn.end();

        if (rows != null && rows.length >= 1) {
            return rows;
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }
}

async function getFavorites(username) {
    try {
        var conn = await pool.getConnection();

        var sql = "SELECT favlist FROM favoriteRecipes WHERE username = '" + username + "'";

        const rows = await conn.query(sql);
        conn.end();

        if (rows != null && rows.length >= 1) {
            return rows[0];
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }
}

async function shareRecipe(recipeName, ingredients, recipe, nbPerson, submitter) {
    try {
        var conn = await pool.getConnection();

        var sql = "INSERT INTO waitingRecipes (name, ingredients, recipe, nbPerson, submitter) VALUES ('" + recipeName + "', '" + JSON.stringify(ingredients) + "', '" + recipe + "', '" + nbPerson + "', '" + submitter + "')";

        console.log(sql);

        const rows = await conn.query(sql);
        conn.end();

        if (rows) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }
}

async function searchRecipe(ingredient) {
    try {
        var conn = await pool.getConnection();

        var sql = "SELECT * FROM recipes WHERE ingredients LIKE '%" + ingredient + "%'";

        const rows = await conn.query(sql);
        conn.end();

        if (rows != null && rows.length >= 1) {
            return rows;
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }
}

async function collectRecipes(ingredients) {
    try {
        var recipes = [];

        // ingredients.forEach(ingredient => {
        //     var recipe = searchRecipe(ingredient);

        //     if (recipe != false) {
        //         recipes.push(recipe);
        //     } else {
        //         recipe = null;
        //     }
        // });

        for (const ingredient of ingredients) {
            recipes.push(await searchRecipe(ingredient));
        }

        if (recipes != null && recipes.length >= 1) {
            return recipes;
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }
}

async function getRecipeById(id) {
    try {
        var conn = await pool.getConnection();

        var sql = "SELECT * FROM recipes WHERE id = '" + id + "'";

        const rows = await conn.query(sql);
        conn.end();

        if (rows != null && rows.length >= 1) {
            return rows[0];
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }

}

async function getFavRecipe(favList) {
    try {
        var recipes = new Array();

        favList = JSON.parse(favList["favlist"]);

        for (const favId of favList) {
            recipes.push(await getRecipeById(favId));
        }

        if (recipes != null && recipes.length >= 1) {
            return recipes;
        } else {
            return false;
        }

    } catch (err) {
        throw err;
    }
}

async function getIngredients() {
    try {
        var conn = await pool.getConnection();

        var sql = "SELECT * FROM ingredients"

        const rows = await conn.query(sql);
        conn.end();

        if (rows != null && rows.length >= 1) {
            return rows;
        } else {
            return false;
        }

    } catch (err) {
        throw err;
    }
}

async function setFav(favListValue, username) {
    try {
        var conn = await pool.getConnection();
        var sql = "UPDATE favoriteRecipes SET favlist = '" + favListValue + "' WHERE username = '" + username + "'";

        console.log(sql);

        const rows = await conn.query(sql);
        conn.end();

        if (rows) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }
}

module.exports = { getRecipe, getFavorites, shareRecipe, collectRecipes, getFavRecipe, getIngredients, setFav };