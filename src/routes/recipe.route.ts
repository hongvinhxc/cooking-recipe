import { Router } from "express";
import validate from "middlewares/validateRequest";
import { getByIdSchema } from "schemas/common.schema";
import { getRecipesSchema } from "schemas/recipe.schema";
import { getRecipeById, getRecipes } from "controllers/recipe.controller";

const recipe = Router();

/**
 * @openapi
 * '/api/recipe':
 *  get:
 *     tags:
 *     - Recipes
 *     summary: Get list recipe
 *     parameters:
 *      - name: name
 *        in: query
 *        description: Search recipe by name
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
 *                        $ref: '#/components/schema/recipeResponse'
 *
 *       404:
 *         description: Recipe not found
 */
recipe.get("/", validate(getRecipesSchema), getRecipes);

/**
 * @openapi
 * '/api/recipe/{id}':
 *  get:
 *     tags:
 *     - Recipes
 *     summary: Get a single recipe by id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the recipe
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/recipeResponse'
 *       404:
 *         description: Recipe not found
 */
recipe.get("/:id", validate(getByIdSchema), getRecipeById);

export default recipe;
