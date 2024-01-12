import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import logger from "./utils/logger";
import logRequest from "./middleware/log-request";

dotenv.config();

const app = express();
app.use(logRequest);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    logger.info(`Listening on http://localhost:${port}`);
});
