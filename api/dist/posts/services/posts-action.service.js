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
exports.PostsActionService = void 0;
const common_1 = require("@nestjs/common");
const oracledb_1 = __importDefault(require("oracledb"));
const database_service_1 = require("../../database/database.service");
let PostsActionService = class PostsActionService {
    async addPost(id, postInfo) {
        return this.db.run(async (conn) => {
            const result = await this.db.callProcedure(conn, "posts_management.add_post(:id, :title, :status, :amount, :storage, :expires, :contacts);", Object.assign(Object.assign({}, postInfo), { id, expires: {
                    val: new Date(postInfo.expires),
                    type: oracledb_1.default.DB_TYPE_DATE,
                } }));
            await conn.commit();
            return result;
        });
    }
    async confirmPost(id) {
        return this.db.run(async (conn) => {
            const result = await this.db.callProcedure(conn, "posts_management.confirm_post(:id);", { id });
            await conn.commit();
            return result;
        });
    }
    async denyPost(id) {
        return this.db.run(async (conn) => {
            const result = await this.db.callProcedure(conn, "posts_management.deny_post(:id);", { id });
            await conn.commit();
            return result;
        });
    }
    async archivePost(id) {
        return this.db.run(async (conn) => {
            const result = await this.db.callProcedure(conn, "posts_management.archive_post(:id);", { id });
            await conn.commit();
            return result;
        });
    }
};
__decorate([
    common_1.Inject(database_service_1.DatabaseService),
    __metadata("design:type", database_service_1.DatabaseService)
], PostsActionService.prototype, "db", void 0);
PostsActionService = __decorate([
    common_1.Injectable()
], PostsActionService);
exports.PostsActionService = PostsActionService;
//# sourceMappingURL=posts-action.service.js.map