import { DataTypes } from "sequelize";
import sequelize from "utils/database";
import Ingredient from "./ingredient.model";
import Recipe from "./recipe.model";

const RecipeIngredients = sequelize.define(
    "RecipeIngredients",
    {
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Recipe,
                key: "id",
            },
        },
        ingredientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Ingredient,
                key: "id",
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        underscored: true,
    }
);

Recipe.belongsToMany(Ingredient, {
    through: RecipeIngredients,
    foreignKey: "recipeId",
    as: "Recipe",
});
Ingredient.belongsToMany(Recipe, {
    through: RecipeIngredients,
    foreignKey: "ingredientId",
    as: "Ingredient",
});

export default RecipeIngredients;
