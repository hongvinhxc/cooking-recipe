import { Request, Response } from "express";
import { GetByIdSchema } from "schemas/common.schema";

export const getRecipeById = (req: Request<GetByIdSchema>, res: Response) => {
    console.log(req.params);

    // throw Error("hihi");
    res.send("ok");
};

export const getRecipes = (req: Request, res: Response) => {
    res.send("ok");
};
