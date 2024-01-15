import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedData = schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            for (let [key, value] of Object.entries(parsedData)) {
                req[key] = value;
            }
            next();
        } catch (e: any) {
            return res.status(400).send(e.errors);
        }
    };

export default validate;
