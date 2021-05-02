export declare class SearchPostsService {
    private readonly db;
    getAutocomplete(query: string): Promise<any>;
    searchPosts(query: string, offset: number): Promise<any>;
    getMyPosts(id: number): Promise<any>;
    getConfirmationPosts(): Promise<any>;
}
