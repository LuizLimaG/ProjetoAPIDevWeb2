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
const mongodb_1 = require("mongodb");
const pacotes_services_1 = __importDefault(require("../services/pacotes-services"));
class PacotesController {
    static buscaPacotePorLocal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = req.db;
                const pacoteService = new pacotes_services_1.default(db);
                let dataNumber;
                try {
                    const { local } = req.query;
                    dataNumber = pacoteService.validarParametroLocal(local);
                }
                catch (error) {
                    const message = error.message;
                    res.status(400).json({
                        message
                    });
                    return;
                }
                res.status(200).json(yield pacoteService.buscarPacotePorLocal(dataNumber));
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        });
    }
    static inserirPacote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = req.db;
                const pacoteService = new pacotes_services_1.default(db);
                let pacote;
                try {
                    const record = req.body;
                    pacote = pacoteService.validar(record);
                }
                catch (error) {
                    const message = error.message;
                    res.status(400).json({
                        message
                    });
                    return;
                }
                yield pacoteService.inserir(pacote);
                res.status(201).json(pacote);
            }
            catch (err) {
                const message = err.message;
                res.status(500).json({
                    message
                });
            }
        });
    }
    static atualizarPacote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let objectId;
            try {
                objectId = new mongodb_1.ObjectId(id);
            }
            catch (error) {
                res.status(400).json({ message: "Id informado inválido" });
                return;
            }
            try {
                const db = req.db;
                const pacoteService = new pacotes_services_1.default(db);
                if (yield pacoteService.existe(objectId)) {
                    let pacote;
                    try {
                        const record = req.body;
                        pacote = pacoteService.validar(record);
                    }
                    catch (error) {
                        res.status(400).json({ message: error.message });
                        return;
                    }
                    yield pacoteService.atualizar(objectId, pacote);
                    res.status(200).json(pacote);
                }
                else {
                    res.status(404).json({ message: "O pacote não existe." });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    static deletarPacote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let objectId;
            try {
                objectId = new mongodb_1.ObjectId(id);
            }
            catch (error) {
                res.status(400).json({ message: "Id informado inválido" });
                return;
            }
            try {
                const db = req.db;
                const pacoteService = new pacotes_services_1.default(db);
                if (yield pacoteService.existe(objectId)) {
                    yield pacoteService.deletar(objectId);
                    res.status(204).send("");
                }
                else {
                    res.status(404).json({ message: "O pacote não existe." });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.default = PacotesController;
