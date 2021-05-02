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
exports.UsersAuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../global/guards/auth.guard");
const users_auth_service_1 = require("../services/users-auth.service");
let UsersAuthController = class UsersAuthController {
    addUser(body) {
        return this.service.addUser(body);
    }
    authenticate(body) {
        return this.service.authenticate(body);
    }
    getInfo(req) {
        return this.service.getInfo(req.user);
    }
};
__decorate([
    common_1.Inject(users_auth_service_1.UsersAuthService),
    __metadata("design:type", users_auth_service_1.UsersAuthService)
], UsersAuthController.prototype, "service", void 0);
__decorate([
    common_1.Post("/"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersAuthController.prototype, "addUser", null);
__decorate([
    common_1.Post("/authenticate"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersAuthController.prototype, "authenticate", null);
__decorate([
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    common_1.Get("/info"),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersAuthController.prototype, "getInfo", null);
UsersAuthController = __decorate([
    common_1.Controller("/users")
], UsersAuthController);
exports.UsersAuthController = UsersAuthController;
//# sourceMappingURL=users-auth.controller.js.map