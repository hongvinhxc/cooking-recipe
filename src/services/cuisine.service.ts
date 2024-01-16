import CuisineModel from "models/cuisine.model";
import { CuisineSchema, GetCuiSinesQuerySchema } from "schemas/cuisine.schema";
import { FindOptions, Op } from "sequelize";

export const findCuisines = async (
    query: GetCuiSinesQuerySchema
): Promise<{ rows: CuisineSchema[]; count: number }> => {
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
    const result = await CuisineModel.findAndCountAll(filter);
    return result as { rows: CuisineSchema[]; count: number };
};
