import { AuthenticateUserDto } from "../dto/authenticate-user.dto";
import { CreateUserDto } from "../dto/create-user.dto";
export declare class UsersAuthController {
    private readonly service;
    addUser(body: CreateUserDto): Promise<any>;
    authenticate(body: AuthenticateUserDto): Promise<any>;
    getInfo(req: any): Promise<any>;
}
