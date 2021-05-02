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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsActionController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../global/guards/auth.guard");
const posts_action_service_1 = require("../services/posts-action.service");
let PostsActionController = class PostsActionController {
    addPost(req, body) {
        return this.service.addPost(req.user.id, body);
    }
    confirmPost(id) {
        return this.service.confirmPost(id);
    }
    denyPost(id) {
        return this.service.denyPost(id);
    }
    archivePost(id) {
        return this.service.archivePost(id);
    }
};
__decorate([
    common_1.Inject(posts_action_service_1.PostsActionService),
    __metadata("design:type", posts_action_service_1.PostsActionService)
], PostsActionController.prototype, "service", void 0);
__decorate([
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    common_1.Post("/"),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsActionController.prototype, "addPost", null);
__decorate([
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    common_1.Put("/:id/confirm"),
    __param(0, common_1.Param("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostsActionController.prototype, "confirmPost", null);
__decorate([
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    common_1.Put("/:id/deny"),
    __param(0, common_1.Param("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostsActionController.prototype, "denyPost", null);
__decorate([
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    common_1.Put("/:id/archive"),
    __param(0, common_1.Param("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostsActionController.prototype, "archivePost", null);
PostsActionController = __decorate([
    common_1.Controller("/posts")
], PostsActionController);
exports.PostsActionController = PostsActionController;
//# sourceMappingURL=posts-action.controller.js.map