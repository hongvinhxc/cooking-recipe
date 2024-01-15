import z from "zod";

export const pagingRequest = z.object({
    pageSize: z.number(),
    pageNumber: z.number(),
});

export const makeListResponse = <T extends z.ZodTypeAny>(item: T) => {
    return z.object({
        items: z.array(item),
        total: z.number().min(0),
        pageSize: z.number().min(1),
        pageNumber: z.number().min(1),
    });
};

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
    pageIndex: number;
};

export const getByIdSchema = z.object({
    params: z.object({
        id: z.coerce.number({
            required_error: "id is required",
        }),
    }),
});

export type GetByIdSchema = z.TypeOf<typeof getByIdSchema>["params"];
