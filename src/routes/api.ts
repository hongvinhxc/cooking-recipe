import { Router } from "express";
import recipe from "./recipe.route";

const api = Router();
api.use("/recipe", recipe);

export default api;
