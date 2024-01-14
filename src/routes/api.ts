import { Router } from "express";
import recipe from "./recipe";

const api = Router();
api.use("/recipe", recipe);

export default api;

/**
 * @openapi
 * components:
 *   schema:
 *     ListRespone:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *         total:
 *           type: number
 *         pageSize:
 *           type: number
 *         pageNumber:
 *           type: number
 *
 */
