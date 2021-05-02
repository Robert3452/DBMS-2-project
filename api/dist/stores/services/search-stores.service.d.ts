export declare class SearchStoresService {
    private readonly db;
    getAutocomplete(query: string): Promise<any>;
    searchStores(query: string, offset: number): Promise<any>;
    searchByDrugId(id: number): Promise<any>;
}
