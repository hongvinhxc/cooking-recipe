import z from "zod";

export const pagingRequest = z.object({
    pageSize: z.coerce.number().default(10),
    pageNumber: z.coerce.number().default(1),
});

export type PagingRequest = z.TypeOf<typeof pagingRequest>;

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
export type ListRespone<T> = {
    items: T[];
    total: number;
    pageSize: number;
    pageNumber: number;
};

export const getByIdSchema = z.object({
    params: z.object({
        id: z.coerce.number({
            required_error: "id is required",
        }),
    }),
});

export type GetByIdSchema = z.TypeOf<typeof getByIdSchema>["params"];
