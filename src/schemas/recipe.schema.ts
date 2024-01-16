import z from "zod";
import { pagingRequest } from "./common.schema";

/**
 * @openapi
 * components:
 *   schema:
 *     Recipe:
 *       type: object
 *       required:
 *        - name
 *        - cuisineId
 *        - imageUrl
 *        - instruction
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *         name:
 *           type: string
 *           default: "Pho"
 *         cuisineId:
 *           type: number
 *           default: "1"
 *         imageUrl:
 *           type: string
 *           default: "https://photo-cms-baophapluat.epicdn.me/w840/Uploaded/2024/hfobhvwbucqaow/2022_10_19/pho-8658.jpg"
 *         instruction:
 *           type: string
 *           default: ""
 *     recipeResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         cuisineId:
 *           type: number
 *         cuisineName:
 *           type: string
 *         imageUrl:
 *           type: string
 *         instruction:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *
 */

export const recipeSchema = z.object({
    id: z.number(),
    name: z.string(),
    ingredients: z
        .array(
            z.object({
                id: z.number(),
                name: z.string(),
            })
        )
        .transform((val) => val ?? []),
    cuisineId: z.number(),
    cuisineName: z.string(),
    imageUrl: z.string(),
    instruction: z.string(),
});

export const getRecipesSchema = z.object({
    query: z
        .object({
            name: z.string().optional(),
            cuisineId: z.union([
                z.coerce.number(),
                z.array(z.coerce.number()).optional(),
            ]),
            ingredientId: z.union([
                z.coerce.number(),
                z.array(z.coerce.number()).optional(),
            ]),
        })
        .extend(pagingRequest.shape),
});

export type RecipeSchema = z.TypeOf<typeof recipeSchema>;
export type GetRecipesSchema = z.TypeOf<typeof getRecipesSchema>;
export type GetRecipesQuerySchema = z.TypeOf<typeof getRecipesSchema>["query"];
