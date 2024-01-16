import cuisine from "routes/cuisine.route";
import { DataTypes } from "sequelize";
import sequelize from "utils/database";
import CuisineModel from "./cuisine.model";

const RecipeModel = sequelize.define(
    "Recipe",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cuisineId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: CuisineModel,
                key: "id",
            },
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        instruction: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        underscored: true,
    }
);

RecipeModel.belongsTo(CuisineModel);

export default RecipeModel;
