import { Request, Response } from "express";
import { ListRespone } from "schemas/common.schema";
import { CuisineSchema, GetCuiSinesQuerySchema } from "schemas/cuisine.schema";
import { findCuisines } from "services/cuisine.service";

export const getCuisinesHandler = async (
    req: Request<{}, {}, {}, GetCuiSinesQuerySchema>,
    res: Response<ListRespone<CuisineSchema>>
) => {
    const query = req.query;
    const result = await findCuisines(query);
    const responseData: ListRespone<CuisineSchema> = {
        items: result.rows,
        total: result.count,
        pageNumber: query.pageNumber,
        pageSize: query.pageSize,
    };
    res.json(responseData);
};
