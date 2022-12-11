import {EntityTarget, Repository} from "typeorm";
import {AppDataSource} from "../index";

export async function createRepository(entityModel: EntityTarget<unknown>): Promise< Repository<unknown>> {
    return AppDataSource.isInitialized
        ? AppDataSource.getRepository(entityModel)
        : await AppDataSource.initialize() && AppDataSource.getRepository(entityModel)
};
