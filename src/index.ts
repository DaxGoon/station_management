import "reflect-metadata";
import { Company} from "./entity/Company";
import { AppDataSource } from "./datasource";
import {Station} from "./entity/Station";
import {StationType} from "./entity/StationType";
import * as express from "express";

const app: express.Express = express();
const port = process.env.PORT || 3000;

async function insertCompany(repository, Company) {
    await repository.save(Company);
    return Company.id;
}

AppDataSource.initialize()
  .then(async () => {
    const companyRepository = await AppDataSource.getRepository(Company);
    const stationTypeRepository = await AppDataSource.getRepository(StationType);
    const stationRepository = await AppDataSource.getRepository(Station);
    // await insertCompany(companyRepository, {id: 10, name: "Company 1", stations: [1], companies: [11]});
  })
  .catch((error) => console.log(error));


app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
