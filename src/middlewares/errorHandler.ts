import { Request, Response } from "express";
import logger from "utils/logger";

const catchError = (error: Error, req: Request, res: Response, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(500);
    res.json({ message: error.message });
};

export default catchError;
