import PacoteViagem from "./models/index.js"
import { MongoClient } from "mongodb"
import database from "./db"

const pacotes: PacoteViagem[] = [
    new PacoteViagem("brasil", "12/04/2023", "20/04/2023", "CNF - 12/04/2023 - 07:30 ~ 09:00", "CGN - 20/04/2023 - 17:30 ~ 19:00"),
    new PacoteViagem("estados unidos", "12/04/2023", "20/04/2023", "CNF - 12/04/2023 - 07:30 ~ 09:00", "CGN - 20/04/2023 - 17:30 ~ 19:00"),
    new PacoteViagem("alemanhã", "12/04/2023", "20/04/2023", "CNF - 12/04/2023 - 07:30 ~ 09:00", "CGN - 20/04/2023 - 17:30 ~ 19:00"),
    new PacoteViagem("colombia", "12/04/2023", "20/04/2023", "CNF - 12/04/2023 - 07:30 ~ 09:00", "CGN - 20/04/2023 - 17:30 ~ 19:00"),
    new PacoteViagem("argentina", "12/04/2023", "20/04/2023", "CNF - 12/04/2023 - 07:30 ~ 09:00", "CGN - 20/04/2023 - 17:30 ~ 19:00")
]

const main = async () => {

    let conn: MongoClient | null = null
    
    try {
        conn = await database.getMongoConn()
        const db = conn.db()
        const pacoteCollection = db.collection("pacotes")

        await pacoteCollection.deleteOne({})
        console.log("Documentos deletados")

        await pacoteCollection.insertOne(pacotes)
        console.log("Dados inseridos com sucesso!")

        const pacotesFind = await pacoteCollection.find().toArray()
        pacotesFind.forEach((value) => {
            console.log(value)
        })

    } catch (error) {
        console.log(error)
    } finally {
        conn?.close()
    }
}

main()