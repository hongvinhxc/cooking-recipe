import fs from "fs";
import path from "path";
import pino from "pino";
import pretty from "pino-pretty";

const LOG_FOLDER = path.resolve(__dirname, "../logs");

if (!fs.existsSync(LOG_FOLDER)) {
    fs.mkdirSync(LOG_FOLDER);
}

const streams: pino.StreamEntry[] = [
    {
        stream: pino.destination(path.join(LOG_FOLDER, "info.log")),
        level: "info",
    },
    {
        stream: pino.destination(path.resolve(LOG_FOLDER, "error.log")),
        level: "error",
    },
    {
        stream: pretty({
            colorize: true,
            sync: true,
            translateTime: "SYS:yyyy-mm-dd hh:MM:ss",
            messageFormat: "{filename}: {msg}",
        }),
        level: "debug",
    },
];

const logger = pino(
    {
        base: null,
        timestamp: pino.stdTimeFunctions.isoTime,
        formatters: {
            level: (label) => {
                return { level: label.toUpperCase() };
            },
        },
    },
    pino.multistream(streams)
);

export default logger;
