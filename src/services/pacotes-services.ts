import { Db, ObjectId } from "mongodb";
import PacoteViagem from "../models";

export default class PacotesServices {
    private db: Db

    constructor(db: Db) {
        this.db = db
    }

    validarParametroLocal(local: any) {
        if (typeof local === "undefined") {
            throw new Error("Parâmetro local não foi informado!");
        } else if (typeof local !== "string") {
            throw new Error("Parâmetro local não é válido!");
        }
        return local
    }

    buscarPacotePorLocal(local: any): Promise<Document[]> {
        const pacotes = this.db.collection("pacotes")
        return pacotes.find({
            local: local
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

        return new PacoteViagem(record.local, record.dataIda, record.dataVolta, record.passagemIda, record.passagemVolta)

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
            _id: objectId
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