import z from "zod";
import { pagingRequest } from "./common.schema";

/**
 * @openapi
 * components:
 *   schema:
 *     Cuisine:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *
 */

export const getCuisinesSchema = z.object({
    query: z
        .object({
            name: z.string(),
        })
        .extend(pagingRequest.shape),
});

export const cuisine = z.object({
    id: z.number(),
    name: z.string(),
});

export type Cuisine = z.TypeOf<typeof cuisine>;
export type GetCuiSinesSchema = z.TypeOf<typeof getCuisinesSchema>;
