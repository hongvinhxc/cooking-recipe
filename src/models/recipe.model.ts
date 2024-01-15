import { DataTypes } from "sequelize";
import sequelize from "utils/database";

const Recipe = sequelize.define(
    "Recipe",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cuisineId: {
            type: DataTypes.INTEGER,
            allowNull: false,
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

export default Recipe;
