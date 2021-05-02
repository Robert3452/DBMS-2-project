"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const oracledb_1 = __importDefault(require("oracledb"));
let DatabaseService = class DatabaseService {
    async init() {
        oracledb_1.default.outFormat = oracledb_1.default.OUT_FORMAT_OBJECT;
        try {
            this.pool = await oracledb_1.default.createPool({
                user: "system",
                password: "mir26012002",
                connectionString: "localhost:1521/xe",
                poolAlias: "default",
            });
            common_1.Logger.log("Database connection established", "DatabaseService");
        }
        catch (error) {
            common_1.Logger.error("Connection error", error.stack, "DatabaseService");
            process.exit(1);
        }
    }
    async getConnection() {
        return this.pool.getConnection();
    }
    async run(callback) {
        const conn = await this.getConnection();
        const result = await callback(conn);
        await conn.close();
        return result;
    }
    async callSelectProcedure(conn, name, params, hasOut = false) {
        const result = await conn.execute(`begin ${name} end;`, Object.assign(Object.assign({}, params), { result: { type: oracledb_1.default.CURSOR, dir: oracledb_1.default.BIND_OUT } }));
        const resultSet = result.outBinds.result;
        const arr = [];
        let item = null;
        while ((item = await resultSet.getRow()))
            arr.push(item);
        await resultSet.close();
        if (hasOut) {
            return Object.assign(Object.assign({}, result.outBinds), { result: arr });
        }
        return arr;
    }
    async callProcedure(conn, name, params) {
        const result = await conn.execute(`begin ${name} end;`, Object.assign({}, params));
        return result.outBinds;
    }
};
DatabaseService = __decorate([
    common_1.Injectable()
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map