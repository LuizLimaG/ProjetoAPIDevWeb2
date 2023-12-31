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
const models_1 = __importDefault(require("../models"));
class PacotesServices {
    constructor(db) {
        this.db = db;
    }
    validarParametroLocal(local) {
        if (typeof local === "undefined") {
            throw new Error("Parâmetro local não foi informado!");
        }
        else if (typeof local !== "string") {
            throw new Error("Parâmetro local não é válido!");
        }
        return local;
    }
    buscarPacotePorLocal(local) {
        const pacotes = this.db.collection("pacotes");
        return pacotes.find({
            local: local
        }).toArray();
    }
    validar(record) {
        if (typeof record.local === "undefined") {
            throw new Error("O atributo local não foi informado");
        }
        if (typeof record.local !== "string") {
            throw new Error("O atributo local não é válido");
        }
        if (record.local === "") {
            throw new Error("O atributo local não pode ser vazio");
        }
        return new models_1.default(record.local, record.dataIda, record.dataVolta, record.passagemIda, record.passagemVolta);
    }
    inserir(pacote) {
        return __awaiter(this, void 0, void 0, function* () {
            const pacotes = this.db.collection("pacotes");
            yield pacotes.insertOne(pacote);
        });
    }
    existe(objectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pacotes = this.db.collection("pacotes");
            const qtd = yield pacotes.find({
                _id: objectId
            }).count();
            return (qtd > 0);
        });
    }
    atualizar(objectId, pacote) {
        return __awaiter(this, void 0, void 0, function* () {
            const pacotes = this.db.collection("pacotes");
            yield pacotes.updateOne({
                _id: objectId
            }, {
                $set: pacote
            });
        });
    }
    deletar(objectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pacotes = this.db.collection("pacotes");
            yield pacotes.deleteOne({
                _id: objectId
            });
        });
    }
}
exports.default = PacotesServices;
