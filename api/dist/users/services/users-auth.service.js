"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersAuthService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let UsersAuthService = class UsersAuthService {
    async addUser(userInfo) {
        return this.db.run(async (conn) => {
            try {
                const password = await bcrypt_1.default.hash(userInfo.password, await bcrypt_1.default.genSalt(10));
                const result = await this.db.callProcedure(conn, "user_management.register(:phone, :fullname, :password);", Object.assign(Object.assign({}, userInfo), { password }));
                await conn.commit();
                return result;
            }
            catch (error) {
                const { errorNum } = error;
                if (errorNum)
                    throw new common_1.BadRequestException("Phone exists");
                throw new common_1.BadRequestException(error.message);
            }
        });
    }
    async authenticate(userInfo) {
        return this.db.run(async (conn) => {
            const [user] = await this.db.callSelectProcedure(conn, "user_management.authenticate(:phone, :result);", { phone: userInfo.phone });
            if (!user)
                throw new common_1.NotFoundException("User not found");
            const result = await bcrypt_1.default.compare(userInfo.password, user.PASSWORD);
            if (!result) {
                throw new common_1.HttpException("Passwords do not match", common_1.HttpStatus.UNAUTHORIZED);
            }
            const token = jsonwebtoken_1.default.sign({
                id: user.ID,
                phone: user.PHONE,
            }, "super_secret");
            delete user["PASSWORD"];
            return { token, user };
        });
    }
    async getInfo(userInfo) {
        return this.db.run(async (conn) => {
            const [user] = await this.db.callSelectProcedure(conn, "user_management.authenticate(:phone, :result);", { phone: userInfo.phone });
            if (!user)
                throw new common_1.NotFoundException("User not found");
            delete user["PASSWORD"];
            return user;
        });
    }
};
__decorate([
    common_1.Inject(database_service_1.DatabaseService),
    __metadata("design:type", database_service_1.DatabaseService)
], UsersAuthService.prototype, "db", void 0);
UsersAuthService = __decorate([
    common_1.Injectable()
], UsersAuthService);
exports.UsersAuthService = UsersAuthService;
//# sourceMappingURL=users-auth.service.js.map