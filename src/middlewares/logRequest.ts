import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

const logRequest = (req: Request, res: Response, next: NextFunction) => {
    const method = req.method;
    const path = decodeURIComponent(req.path);
    const contentLength = req.headers["content-length"] || 0;
    res.on("finish", function () {
        const message = `${method} ${path} ${res.statusCode} ${contentLength}`;
        logger.info(message);
    });
    next();
};

export default logRequest;
