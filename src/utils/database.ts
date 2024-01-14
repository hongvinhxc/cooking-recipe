import { Sequelize } from "sequelize";
import path from "path";
import logger from "./logger";

const sqlitePath = process.env.SQLITE_PATH || "db.sqlite";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.resolve(sqlitePath),
    logging: (msg) => logger.debug(msg),
});

sequelize.sync();

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        logger.info("Connection has been established successfully.");
    } catch (error) {
        logger.error("Unable to connect to the database: " + error);
    }
};

export { testConnection };

export default sequelize;
