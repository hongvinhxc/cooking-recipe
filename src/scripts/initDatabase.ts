import logger from "utils/logger";
import cuisineData from "./data/cuisine.json";
import recipeData from "./data/recipe.json";
import ingredientData from "./data/ingredient.json";
import Cuisine from "models/cuisine.model";
import Recipe from "models/recipe.model";
import Ingredient from "models/ingredient.model";
import RecipeIngredients from "models/recipeIngredients.model";
import sequelize from "utils/database";

const initCuisine = async () => {
    await Cuisine.bulkCreate(cuisineData.map((name) => ({ name }))).then(() => {
        logger.info(`Inserted ${cuisineData.length} cuisines`);
    });
};

const initRecipe = async () => {
    await Recipe.bulkCreate(
        recipeData.map(({ name, cuisineId, imageUrl, instruction }) => ({
            name,
            cuisineId,
            imageUrl,
            instruction,
        }))
    ).then(() => {
        logger.info(`Inserted ${recipeData.length} recipes`);
    });
};

const initIngredient = async () => {
    await Ingredient.bulkCreate(ingredientData.map((name) => ({ name }))).then(
        () => {
            logger.info(`Inserted ${ingredientData.length} ingredients`);
        }
    );
};

const generateRecipeIngredient = async () => {
    const totalRecipe = await Recipe.count();
    const totalIngredient = await Ingredient.count();
    const listRecipeId = Array.from({ length: totalRecipe }, (_, i) => i + 1);
    const listIngredientId = Array.from(
        { length: totalIngredient },
        (_, i) => i + 1
    );
    const data = combineRecipeIngredients(listRecipeId, listIngredientId);
    await RecipeIngredients.bulkCreate(data).then(() => {
        logger.info(`Inserted ${data.length} recipe-ingredients`);
    });
};

function combineRecipeIngredients(
    listRecipeId: number[],
    listIngredientId: number[]
) {
    const recipeIngredientPairs = [];

    for (const recipeId of listRecipeId) {
        const listShuffleIngredientId = listIngredientId.sort(
            () => 0.5 - Math.random()
        );
        const numberIngredient = Math.floor(Math.random() * 5 + 5);
        const listSelectedIngredientId = listShuffleIngredientId.slice(
            0,
            numberIngredient
        );
        for (const ingredientId of listSelectedIngredientId) {
            const quantity = Math.floor(Math.random() * 10) + 1;
            const unit = ["grams", "cups", "teaspoons", "tablespoons"][
                Math.floor(Math.random() * 4)
            ];

            recipeIngredientPairs.push({
                recipeId: recipeId,
                ingredientId: ingredientId,
                quantity: quantity,
                unit: unit,
            });
        }
    }

    return recipeIngredientPairs;
}

const initDatabase = async () => {
    if (process.argv.length < 3 || process.argv[2] !== "init-db") return;
    logger.info("Initing database...");
    await sequelize.sync({ force: true });
    await initCuisine();
    await initRecipe();
    await initIngredient();
    await generateRecipeIngredient();
    logger.info("Init database done!");
    process.exit(0);
};

export default initDatabase;
