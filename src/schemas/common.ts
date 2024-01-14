import z from "zod";

export const pagingRequest = z.object({
    pageSize: z.number(),
    pageNumber: z.number(),
});

export type PagingRequest = z.TypeOf<typeof pagingRequest>;
