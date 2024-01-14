import z from "zod";

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
 *         name:
 *           type: string
 *           default: "Pho"
 *         cuisineId:
 *           type: number
 *           default: "1"
 *         imageUrl:
 *           type: string
 *           default: "https://i.imgur.com/QlRphfQ.jpg"
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

const params = {
    params: z.object({
        id: z.number({
            description: "recipe id",
            required_error: "id is required",
        }),
    }),
};

export const getRecipeSchema = z.object({
    ...params,
});

export type GetRecipeSchema = z.TypeOf<typeof getRecipeSchema>;
