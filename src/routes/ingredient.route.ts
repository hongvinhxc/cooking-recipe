import { Router } from "express";
import { getIngredientsHandler } from "controllers/ingredient.controller";
import validate from "middlewares/validateRequest";
import { getIngredientsSchema } from "schemas/ingredient.schema";

const ingredient = Router();

/**
 * @openapi
 * '/api/ingredient':
 *  get:
 *     tags:
 *     - Ingredient
 *     summary: Get list ingredient
 *     parameters:
 *      - name: name
 *        in: query
 *        description: Search ingredient by name
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
 *                        $ref: '#/components/schema/Ingredient'
 *
 *       404:
 *         description: Ingredient not found
 */
ingredient.get("/", validate(getIngredientsSchema), getIngredientsHandler);

export default ingredient;
