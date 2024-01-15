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

export const getRecipesSchema = z.object({
    query: z
        .object({
            name: z.object({}),
        })
        .extend(pagingRequest.shape),
});
