import fs from "fs";
import path from "path";
import pino from "pino";
import pretty from "pino-pretty";

const logPath = process.env.LOG_FOLDER || path.resolve("logs");

if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
}

const streams: pino.StreamEntry[] = [
    {
        stream: pino.destination(path.join(logPath, "info.log")),
        level: "info",
    },
    {
        stream: pino.destination(path.resolve(logPath, "error.log")),
        level: "error",
    },
    {
        stream: pretty({
            colorize: true,
            sync: true,
            translateTime: "SYS:yyyy-mm-dd hh:MM:ss",
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
