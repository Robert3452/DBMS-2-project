import { AuthenticateUserDto } from "../dto/authenticate-user.dto";
import { CreateUserDto } from "../dto/create-user.dto";
export declare class UsersAuthService {
    private readonly db;
    addUser(userInfo: CreateUserDto): Promise<any>;
    authenticate(userInfo: AuthenticateUserDto): Promise<any>;
    getInfo(userInfo: AuthenticateUserDto): Promise<any>;
}
