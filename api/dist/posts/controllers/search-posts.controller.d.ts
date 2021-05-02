export declare class SearchPostsController {
    private readonly service;
    getAutocomplete(query: string): Promise<any>;
    searchMedicines(query: string, offset: number): Promise<any>;
    searchMyPosts(req: any): Promise<any>;
    getConfirmationPosts(): Promise<any>;
}
