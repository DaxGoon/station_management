export async function queryAll(repository, tableName: string): Promise<any> {
    return await repository.createQueryBuilder(tableName)
        .getMany();
}

