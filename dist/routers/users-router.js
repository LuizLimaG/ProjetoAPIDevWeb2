"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controllers_1 = __importDefault(require("../controllers/users-controllers"));
const usersRouter = express_1.default.Router();
usersRouter.post("/login", users_controllers_1.default.login);
exports.default = usersRouter;
