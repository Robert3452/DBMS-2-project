import { CreatePostDto } from "../dto/create-post.dto";
export declare class PostsActionController {
    private readonly service;
    addPost(req: any, body: CreatePostDto): Promise<any>;
    confirmPost(id: number): Promise<any>;
    denyPost(id: number): Promise<any>;
    archivePost(id: number): Promise<any>;
}
