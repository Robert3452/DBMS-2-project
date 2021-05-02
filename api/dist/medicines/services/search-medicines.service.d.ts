export declare class SearchMedicinesService {
    private readonly db;
    getAutocomplete(query: string): Promise<any>;
    searchMedicines(query: string, offset: number): Promise<any>;
    getMedicine(id: number): Promise<any>;
}
