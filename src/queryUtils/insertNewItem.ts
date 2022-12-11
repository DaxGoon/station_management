export async function insertNewItem(repository, Item): Promise<number> {
    await repository.save(Item);
    return Item.id;
}
