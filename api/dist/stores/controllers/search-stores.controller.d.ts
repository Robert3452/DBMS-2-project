export declare class SearchStoresController {
    private readonly service;
    getAutocomplete(query: string): Promise<any>;
    searchStores(query: string, offset: number): Promise<any>;
    searchByDrugId(id: number): Promise<any>;
}
