import { EntityDataProvider, DataProvider } from '../data-interfaces';
import { EntityMetadata } from '../remult3';
export interface JsonEntityStorage {
    getItem(entityDbName: string): string | null;
    setItem(entityDbName: string, json: string): any;
}
export declare class JsonDataProvider implements DataProvider {
    private storage;
    constructor(storage: JsonEntityStorage);
    getEntityDataProvider(entity: EntityMetadata): EntityDataProvider;
    transaction(action: (dataProvider: DataProvider) => Promise<void>): Promise<void>;
}
