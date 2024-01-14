import { Request, Response, Router } from "express";
import validate from "middlewares/validateRequest";
import { getCuisinesSchema } from "schemas/cuisine";

const cuisine = Router();

/**
 * @openapi
 * '/cuisine':
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
 *                        $ref: '#/components/schema/cuisineResponse'
 *
 *       404:
 *         description: cuisine not found
 */
cuisine.get("/", (req: Request, res: Response) => {
    res.send("ok");
});

export default cuisine;
