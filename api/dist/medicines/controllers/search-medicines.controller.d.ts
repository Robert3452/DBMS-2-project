export declare class SearchMedicinesController {
    private readonly service;
    getAutocomplete(query: string): Promise<any>;
    searchMedicines(query: string, offset: number): Promise<any>;
    getMedicine(id: number): Promise<any>;
}
