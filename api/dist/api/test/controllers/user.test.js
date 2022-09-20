"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const axios_1 = __importDefault(require("axios"));
globals_1.describe("Get all users", () => {
    globals_1.test("return all the users", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios_1.default.get('http://localhost:5001/api/v1/users/');
        expect(res.status).toBe(201);
    }));
});
globals_1.describe("Get all users", () => {
    globals_1.test("return all the users", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios_1.default.get('http://localhost:5001/api/v1/users/getUser/4');
        expect(res.status).toBe(200);
    }));
});
//# sourceMappingURL=user.test.js.map