import { Request, Response } from "express";
import logger from "../utils/logger";

const logRequest = (req: Request, res: Response) => {
    logger.info(
        `${req.method} ${req.path} ${res.statusCode} ${req.socket.bytesRead}`
    );
};

export default logRequest;
