import z from "zod";
import { pagingRequest } from "./common";

/**
 * @openapi
 * components:
 *   schema:
 *     cuisineResponse:
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

export type GetCuiSinesSchema = z.TypeOf<typeof getCuisinesSchema>;
