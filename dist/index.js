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
const index_js_1 = __importDefault(require("./models/index.js"));
const db_1 = __importDefault(require("./db"));
const pacotes = [
    new index_js_1.default("Brasil", 203062512),
    new index_js_1.default("Estados Unidos", 339987103),
    new index_js_1.default("Egito", 102334404),
    new index_js_1.default("Reino Unido", 67886011),
    new index_js_1.default("Argentina", 45195774)
];
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let conn = null;
    try {
        conn = yield db_1.default.getMongoConn();
        const db = conn.db(); // devweb2
        const pacoteCollection = db.collection("pacotes");
        // deleta todos os documentos da coleção
        // Como se fosse: delete from pacotes;
        yield pacoteCollection.deleteMany({});
        console.log("Documentos deletados");
        /*// forma verbosa
        for (let pais of pacotes) {
            // Como se fosse: select count(*) from pacotes where nome = ?;
            let qtd = await pacoteCollection.find({nome: pais.nome}).count();
            if (qtd === 0) {
                await pacoteCollection.insertOne(pais);
            }
        }*/
        yield pacoteCollection.insertMany(pacotes);
        console.log("Dados inseridos com sucesso!");
        const pacotesFind = yield pacoteCollection.find().toArray();
        pacotesFind.forEach((value) => {
            console.log(value);
        });
    }
    catch (error) {
        console.log(error);
    }
    finally {
        conn === null || conn === void 0 ? void 0 : conn.close();
    }
});
main();
