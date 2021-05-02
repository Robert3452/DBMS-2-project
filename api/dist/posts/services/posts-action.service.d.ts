import { CreatePostDto } from "../dto/create-post.dto";
export declare class PostsActionService {
    private readonly db;
    addPost(id: number, postInfo: CreatePostDto): Promise<any>;
    confirmPost(id: number): Promise<any>;
    denyPost(id: number): Promise<any>;
    archivePost(id: number): Promise<any>;
}
