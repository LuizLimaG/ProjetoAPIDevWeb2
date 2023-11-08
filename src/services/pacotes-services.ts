import { Db, ObjectId } from "mongodb";
import PacoteViagem from "../models";

export default class PacotesServices {
    private db: Db

    constructor(db: Db) {
        this.db = db
    }

    validarParametroData(data: any): number {
        if (typeof data === "undefined") {
            throw new Error("Parâmetro data não foi informado!");
        }
        if (typeof data !== "string") {
            throw new Error("Parâmetro data não é válido!");
        }
        let dataNumber = parseInt(data);
        if (isNaN(dataNumber)) { // se for NaN -> Not a Number
            throw new Error("Parâmetro data não é valido!");
        }
        return dataNumber;
    }

    buscarPacotePorData(data: any): Promise<Document[]> {
        const pacotes = this.db.collection("pacotes")
        return pacotes.find({
            data: { $gte: data }
        }).toArray()
    }

    validar(record: any): PacoteViagem {
        if (typeof record.local === "undefined") {
            throw new Error("O atributo local não foi informado");
        }
        if (typeof record.local !== "string") {
            throw new Error("O atributo local não é válido");
        }
        if (record.local === "") {
            throw new Error("O atributo local não pode ser vazio");
        }

        if (typeof record.data === "undefined") {
            throw new Error("O atributo data não foi informado");
        }
        if (typeof record.data !== "number") {
            throw new Error("O atributo data não é válido");
        }
        if (record.data < 0) {
            throw new Error("O atributo data não pode ser negativo");
        }

        return new PacoteViagem(record.local, record.data)

    }

    async inserir(pacote: PacoteViagem) {
        const pacotes = this.db.collection("pacotes")
        await pacotes.insertOne(pacote)
    }

    async existe(objectId: ObjectId): Promise<boolean> {
        const pacotes = this.db.collection("pacotes")
        const qtd = await pacotes.find({
        _id: objectId
        }).count()
        return (qtd > 0)
    }

    async atualizar(objectId: ObjectId, pacote: PacoteViagem) {
        const pacotes = this.db.collection("pacotes")
        await pacotes.updateOne({
            _id: ObjectId
        }, {
            $set: pacote
        })
    }

    async deletar(objectId: ObjectId) {
        const pacotes = this.db.collection("pacotes")
        await pacotes.deleteOne({
            _id: objectId
        })
    }

}