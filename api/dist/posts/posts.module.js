"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const posts_action_controller_1 = require("./controllers/posts-action.controller");
const search_posts_controller_1 = require("./controllers/search-posts.controller");
const posts_action_service_1 = require("./services/posts-action.service");
const search_posts_service_1 = require("./services/search-posts.service");
let PostsModule = class PostsModule {
};
PostsModule = __decorate([
    common_1.Module({
        controllers: [search_posts_controller_1.SearchPostsController, posts_action_controller_1.PostsActionController],
        providers: [search_posts_service_1.SearchPostsService, posts_action_service_1.PostsActionService],
    })
], PostsModule);
exports.PostsModule = PostsModule;
//# sourceMappingURL=posts.module.js.map