import { NextFunction, Request, Response } from "express";

const catchError = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(500);
    res.json({ message: error.message });
};

export default catchError;
