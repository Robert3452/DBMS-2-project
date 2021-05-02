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
exports.SearchPostsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
const oracledb_1 = __importDefault(require("oracledb"));
let SearchPostsService = class SearchPostsService {
    async getAutocomplete(query) {
        return this.db.run(async (conn) => {
            const result = await this.db.callSelectProcedure(conn, "posts_management.get_autocomplete(:query, :result);", { query });
            return result;
        });
    }
    async searchPosts(query, offset) {
        return this.db.run(async (conn) => {
            const result = await this.db.callSelectProcedure(conn, "posts_management.get_posts(:query, :result, :offset, :count);", {
                query,
                offset: +offset,
                count: { type: oracledb_1.default.DB_TYPE_NUMBER, dir: oracledb_1.default.BIND_OUT },
            }, true);
            return result;
        });
    }
    async getMyPosts(id) {
        return this.db.run(async (conn) => {
            const result = await this.db.callSelectProcedure(conn, "posts_management.get_my_posts(:id, :result);", { id });
            return result;
        });
    }
    async getConfirmationPosts() {
        return this.db.run(async (conn) => {
            const result = await this.db.callSelectProcedure(conn, "posts_management.get_confirmation_posts(:result);", {});
            return result;
        });
    }
};
__decorate([
    common_1.Inject(database_service_1.DatabaseService),
    __metadata("design:type", database_service_1.DatabaseService)
], SearchPostsService.prototype, "db", void 0);
SearchPostsService = __decorate([
    common_1.Injectable()
], SearchPostsService);
exports.SearchPostsService = SearchPostsService;
//# sourceMappingURL=search-posts.service.js.map