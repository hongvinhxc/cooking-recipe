import { DataTypes } from "sequelize";
import sequelize from "utils/database";
import RecipeModel from "./recipe.model";
import IngredientModel from "./ingredient.model";

const RecipeIngredientsModel = sequelize.define(
    "RecipeIngredients",
    {
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: RecipeModel,
                key: "id",
            },
        },
        ingredientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: IngredientModel,
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

RecipeModel.belongsToMany(IngredientModel, {
    through: RecipeIngredientsModel,
    foreignKey: "recipeId",
});
IngredientModel.belongsToMany(RecipeModel, {
    through: RecipeIngredientsModel,
    foreignKey: "ingredientId",
});

export default RecipeIngredientsModel;
