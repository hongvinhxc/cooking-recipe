import z from "zod";
import { pagingRequest } from "./common.schema";

/**
 * @openapi
 * components:
 *   schema:
 *     Ingredient:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           readOnly: true
 *         name:
 *           type: string
 *
 */

export const getIngredientsSchema = z.object({
    query: z
        .object({
            name: z.string().optional(),
        })
        .extend(pagingRequest.shape),
});

export const ingredientSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export type IngredientSchema = z.TypeOf<typeof ingredientSchema>;
export type GetIngredientsSchema = z.TypeOf<typeof getIngredientsSchema>;
export type GetIngredientsQuerySchema = z.TypeOf<
    typeof getIngredientsSchema
>["query"];
