import IngredientModel from "models/ingredient.model";
import {
    IngredientSchema,
    GetIngredientsQuerySchema,
} from "schemas/ingredient.schema";
import { FindOptions, Op } from "sequelize";

export const findIngredients = async (
    query: GetIngredientsQuerySchema
): Promise<{ rows: IngredientSchema[]; count: number }> => {
    const filter: FindOptions = {
        attributes: ["id", "name"],
        where: {},
        limit: query.pageSize,
        offset: (query.pageNumber - 1) * query.pageSize,
    };
    if (query.name) {
        filter.where["name"] = {
            [Op.like]: `%${query.name.trim()}%`,
        };
    }
    const result = await IngredientModel.findAndCountAll(filter);
    return result as { rows: IngredientSchema[]; count: number };
};
