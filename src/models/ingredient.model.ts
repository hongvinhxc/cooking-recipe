import { DataTypes } from "sequelize";
import sequelize from "utils/database";

const IngredientModel = sequelize.define(
    "Ingredient",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        underscored: true,
    }
);

export default IngredientModel;
