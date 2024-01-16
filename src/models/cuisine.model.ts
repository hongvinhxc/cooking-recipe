import { DataTypes } from "sequelize";
import sequelize from "utils/database";

const CuisineModel = sequelize.define(
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

export default CuisineModel;
