import CuisineModel from "models/cuisine.model";
import IngredientModel from "models/ingredient.model";
import Recipe from "models/recipe.model";
import recipe from "routes/recipe.route";
import { GetRecipesQuerySchema, RecipeSchema } from "schemas/recipe.schema";
import { FindOptions, Model, Op } from "sequelize";

const formatRecipe = (recipe: Model) => {
    const flattenRecipe = {
        id: recipe["id"],
        name: recipe["name"],
        cuisineId: recipe["Cuisine"]["id"],
        cuisineName: recipe["Cuisine"]["name"],
        imageUrl: recipe["imageUrl"],
        instruction: recipe["instruction"],
        ingredients: recipe["Ingredients"].map((item) => ({
            id: item["id"],
            name: item["id"],
            quantity: item["RecipeIngredients"]["quantity"],
            unit: item["RecipeIngredients"]["unit"],
        })),
    };
    return flattenRecipe;
};

export const findRecipes = async (
    query: GetRecipesQuerySchema
): Promise<{ rows: RecipeSchema[]; count: number }> => {
    const filter: FindOptions = {
        attributes: ["id", "name", "imageUrl", "instruction"],
        where: {},
        limit: query.pageSize,
        offset: (query.pageNumber - 1) * query.pageSize,
    };

    if (query.name) {
        filter.where["name"] = {
            [Op.like]: `%${query.name}%`,
        };
    }

    if (query.cuisineId) {
        filter.where["cuisineId"] = {
            [Op.or]: query.cuisineId,
        };
    }

    const count = await Recipe.count(filter);

    filter["include"] = [
        {
            model: IngredientModel,
            attributes: ["id", "name"],
            through: {
                attributes: ["quantity", "unit"],
            },
            where: {},
        },
        {
            model: CuisineModel,
            attributes: ["id", "name"],
        },
    ];

    if (query.ingredientId) {
        filter["include"][0]["where"]["id"] = {
            [Op.or]: query.ingredientId,
        };
    }

    const result = await Recipe.findAndCountAll(filter);
    const flattenRecipes = result.rows.map(formatRecipe);

    return {
        rows: flattenRecipes,
        count: count,
    };
};

export const findRecipeById = async (id: number): Promise<RecipeSchema> => {
    const recipe = await Recipe.findByPk(id, {
        attributes: ["id", "name", "imageUrl", "instruction"],
        include: [
            {
                model: IngredientModel,
                attributes: ["id", "name"],
                through: {
                    attributes: ["quantity", "unit"],
                },
            },
            {
                model: CuisineModel,
                attributes: ["id", "name"],
            },
        ],
    });
    const flattenRecipe: RecipeSchema = formatRecipe(recipe);
    return flattenRecipe;
};
