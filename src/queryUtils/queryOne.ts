export async function queryOne(repository, tableName: string, selector: string): Promise<any> {
    return await repository.createQueryBuilder(tableName)
        .where(`${tableName}.id = :id`, { id: parseInt(selector) })
        .getRawOne()
}
