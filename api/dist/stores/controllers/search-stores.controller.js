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
exports.SearchStoresController = void 0;
const common_1 = require("@nestjs/common");
const search_stores_service_1 = require("../services/search-stores.service");
let SearchStoresController = class SearchStoresController {
    getAutocomplete(query) {
        if (!query) {
            throw new common_1.BadRequestException("Not enough parameters");
        }
        return this.service.getAutocomplete(query);
    }
    searchStores(query, offset) {
        if (!query) {
            throw new common_1.BadRequestException("Not enough parameters");
        }
        return this.service.searchStores(query, offset || 0);
    }
    searchByDrugId(id) {
        return this.service.searchByDrugId(id);
    }
};
__decorate([
    common_1.Inject(search_stores_service_1.SearchStoresService),
    __metadata("design:type", search_stores_service_1.SearchStoresService)
], SearchStoresController.prototype, "service", void 0);
__decorate([
    common_1.Get("/autocomplete"),
    __param(0, common_1.Query("query")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SearchStoresController.prototype, "getAutocomplete", null);
__decorate([
    common_1.Get("/"),
    __param(0, common_1.Query("query")),
    __param(1, common_1.Query("offset")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], SearchStoresController.prototype, "searchStores", null);
__decorate([
    common_1.Get("/by-drug-id/:id"),
    __param(0, common_1.Param("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SearchStoresController.prototype, "searchByDrugId", null);
SearchStoresController = __decorate([
    common_1.Controller("/stores")
], SearchStoresController);
exports.SearchStoresController = SearchStoresController;
//# sourceMappingURL=search-stores.controller.js.map