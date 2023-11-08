"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pacote_viagem_1 = __importDefault(require("../controllers/pacote-viagem"));
const users_controllers_1 = __importDefault(require("../controllers/users-controllers"));
const pacoteRouter = express_1.default.Router();
pacoteRouter.get("/", users_controllers_1.default.auth, pacote_viagem_1.default.buscaPacotePorData);
pacoteRouter.post("/:id", users_controllers_1.default.auth, pacote_viagem_1.default.inserirPacote);
pacoteRouter.put("/:id", users_controllers_1.default.auth, pacote_viagem_1.default.atualizarPacote);
pacoteRouter.delete("/:id", users_controllers_1.default.auth, pacote_viagem_1.default.deletarPacote);
exports.default = pacoteRouter;
