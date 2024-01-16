import { Router } from "express";
import { getCuisinesHandler } from "controllers/cuisine.controller";
import validate from "middlewares/validateRequest";
import { getCuisinesSchema } from "schemas/cuisine.schema";

const cuisine = Router();

/**
 * @openapi
 * '/api/cuisine':
 *  get:
 *     tags:
 *     - Cuisines
 *     summary: Get list cuisine
 *     parameters:
 *      - name: name
 *        in: query
 *        description: Search cuisine by name
 *        required: false
 *      - name: pageSize
 *        in: query
 *        description: The page size of pagination
 *        required: true
 *      - name: pageNumber
 *        in: query
 *        description: The page number of pagination
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              allOf:
 *                - $ref: '#/components/schema/ListRespone'
 *                - type: object
 *                  properties:
 *                    items:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schema/Cuisine'
 *
 *       404:
 *         description: cuisine not found
 */
cuisine.get("/", validate(getCuisinesSchema), getCuisinesHandler);

export default cuisine;
