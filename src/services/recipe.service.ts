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
            name: item["name"],
            quantity: item["RecipeIngredients"]["quantity"],
            unit: item["RecipeIngredients"]["unit"],
        })),
    };
    return flattenRecipe;
};

const buildRecipeFilter = ({
    query,
    isGetPK,
}: {
    query: GetRecipesQuerySchema;
    isGetPK: boolean;
}) => {
    let recipeAttributes = ["id", "name", "imageUrl", "instruction"];
    let includeAttributes = ["id", "name"];
    if (isGetPK) {
        recipeAttributes = ["id"];
        includeAttributes = [];
    }
    const filter: FindOptions = {
        attributes: recipeAttributes,
        where: {},
        limit: query.pageSize,
        offset: (query.pageNumber - 1) * query.pageSize,
        include: [
            {
                model: IngredientModel,
                attributes: includeAttributes,
                through: {
                    attributes: ["quantity", "unit"],
                },
                where: {},
            },
            {
                model: CuisineModel,
                attributes: includeAttributes,
            },
        ],
        ["distinct" as string]: true,
    };

    if (!isGetPK) return filter;

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

    if (query.ingredientId && isGetPK) {
        filter["include"][0]["where"]["id"] = {
            [Op.or]: query.ingredientId,
        };
    }

    return filter;
};

export const findRecipes = async (
    query: GetRecipesQuerySchema
): Promise<{ rows: RecipeSchema[]; count: number }> => {
    const filterGetPK = buildRecipeFilter({ query, isGetPK: true });
    const resultPK = await Recipe.findAndCountAll(filterGetPK);
    const listPK = resultPK.rows.map((item) => item["id"]);
    const filter = buildRecipeFilter({ query, isGetPK: false });
    filter["where"]["id"] = listPK;
    const result = await Recipe.findAll(filter);
    const flattenRecipes = result.map(formatRecipe);

    return {
        rows: flattenRecipes,
        count: resultPK.count,
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
