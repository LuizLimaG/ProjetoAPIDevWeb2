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
    new index_js_1.default("brasil", "12/04/2023", "20/04/2023", "CNF - 12/04/2023 - 07:30 ~ 09:00", "CGN - 20/04/2023 - 17:30 ~ 19:00"),
    new index_js_1.default("estados unidos", "12/04/2023", "20/04/2023", "CNF - 12/04/2023 - 07:30 ~ 09:00", "CGN - 20/04/2023 - 17:30 ~ 19:00"),
    new index_js_1.default("alemanhã", "12/04/2023", "20/04/2023", "CNF - 12/04/2023 - 07:30 ~ 09:00", "CGN - 20/04/2023 - 17:30 ~ 19:00"),
    new index_js_1.default("colombia", "12/04/2023", "20/04/2023", "CNF - 12/04/2023 - 07:30 ~ 09:00", "CGN - 20/04/2023 - 17:30 ~ 19:00"),
    new index_js_1.default("argentina", "12/04/2023", "20/04/2023", "CNF - 12/04/2023 - 07:30 ~ 09:00", "CGN - 20/04/2023 - 17:30 ~ 19:00")
];
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let conn = null;
    try {
        conn = yield db_1.default.getMongoConn();
        const db = conn.db();
        const pacoteCollection = db.collection("pacotes");
        yield pacoteCollection.deleteOne({});
        console.log("Documentos deletados");
        yield pacoteCollection.insertOne(pacotes);
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
