import path from "path";
import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import log from "./logger";

const srcPath = path.resolve(path.dirname(__dirname));

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version,
        },
        basePath: "api",
    },
    apis: [
        path.resolve(srcPath, "routes/*.ts"),
        path.resolve(srcPath, "schemas/*.ts"),
        path.resolve(srcPath, "routes/*.js"),
        path.resolve(srcPath, "schemas/*.js"),
    ],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
    // Swagger page
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get("/docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    log.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
