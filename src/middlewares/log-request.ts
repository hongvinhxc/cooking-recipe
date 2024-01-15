import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

const logRequest = (req: Request, res: Response, next: NextFunction) => {
    const json = res.json;
    const method = req.method;
    const path = decodeURIComponent(req.path);
    const contentLength = req.headers["content-length"] || 0;
    res.json = (data) => {
        const message = `${method} ${path} ${res.statusCode} ${contentLength}`;
        logger.info(message);
        res.json = json;
        return res.json(data);
    };
    res.on("finish", function () {
        console.log(res.statusCode); // actual 404
    });
    next();
};

export default logRequest;
