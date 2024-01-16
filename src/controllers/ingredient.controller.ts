import { Request, Response } from "express";
import { ListRespone } from "schemas/common.schema";
import {
    IngredientSchema,
    GetIngredientsQuerySchema,
} from "schemas/ingredient.schema";
import { findIngredients } from "services/ingredient.service";

export const getIngredientsHandler = async (
    req: Request<{}, {}, {}, GetIngredientsQuerySchema>,
    res: Response<ListRespone<IngredientSchema>>
) => {
    const query = req.query;
    const result = await findIngredients(query);
    const responseData: ListRespone<IngredientSchema> = {
        items: result.rows,
        total: result.count,
        pageNumber: query.pageNumber,
        pageSize: query.pageSize,
    };
    res.json(responseData);
};
