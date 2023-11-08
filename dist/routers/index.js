"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pacote_router_1 = __importDefault(require("./pacote-router"));
const users_router_1 = __importDefault(require("./users-router"));
const routers = {
    pacoteRouter: pacote_router_1.default,
    usersRouter: users_router_1.default
};
exports.default = routers;
