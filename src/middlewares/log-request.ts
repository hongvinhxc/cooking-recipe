import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

const logRequest = (req: Request, res: Response, next: NextFunction) => {
    const message = `${req.method} ${req.path} ${res.statusCode} ${
        req.headers["content-length"] || 0
    }`;
    logger.info(message);
    next();
};

export default logRequest;
