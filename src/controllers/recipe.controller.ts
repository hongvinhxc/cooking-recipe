import { Request, Response } from "express";
import { GetByIdSchema, ListRespone } from "schemas/common.schema";
import { GetRecipesQuerySchema, RecipeSchema } from "schemas/recipe.schema";
import { findRecipeById, findRecipes } from "services/recipe.service";

export const getRecipeById = async (
    req: Request<GetByIdSchema>,
    res: Response<RecipeSchema>
) => {
    const recipe = await findRecipeById(req.params.id);
    res.json(recipe);
};

export const getRecipes = async (
    req: Request<{}, {}, {}, GetRecipesQuerySchema>,
    res: Response<ListRespone<RecipeSchema>>
) => {
    let query = req.query;
    if (typeof query.cuisineId === "number") {
        query.cuisineId = [query.cuisineId];
    }
    if (typeof query.ingredientId === "number") {
        query.ingredientId = [query.ingredientId];
    }
    const result = await findRecipes(query);
    const responseData: ListRespone<RecipeSchema> = {
        items: result.rows,
        total: result.count,
        pageNumber: query.pageNumber,
        pageSize: query.pageSize,
    };
    res.json(responseData);
};
