import { DataTypes } from "sequelize";
import sequelize from "utils/database";

const Ingredient = sequelize.define(
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

export default Ingredient;
