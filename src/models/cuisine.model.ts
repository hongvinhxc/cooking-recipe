import { DataTypes } from "sequelize";
import sequelize from "utils/database";

const Cuisine = sequelize.define(
    "Cuisine",
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

export default Cuisine;
