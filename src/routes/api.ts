import { Router } from "express";
import recipe from "./recipe.route";
import cuisine from "./cuisine.route";
import ingredient from "./ingredient.route";

const api = Router();
api.use("/recipe", recipe);
api.use("/cuisine", cuisine);
api.use("/ingredient", ingredient);

export default api;
