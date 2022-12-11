import "reflect-metadata";
import * as dotenv from "dotenv"
import * as express from "express";
import {routesRegistry} from "./routes/routesRegistry";
import {DataSource} from "typeorm";

dotenv.config()
const port = process.env.PORT;
const app: express.Express = express();

export const AppDataSource = new DataSource({
    type: "cockroachdb",
    url: process.env.DATABASE_URL,
    ssl: true,
    extra: {
        application_name: "station_management"
    },
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
});

(async () => {await AppDataSource.initialize()})();

app.listen(port, () => {
    console.info(`Server running on port ${port}`);
    Object.keys(routesRegistry).forEach((routePath) => app.use(routePath, routesRegistry[routePath]));
    app.use(express.text());
});
