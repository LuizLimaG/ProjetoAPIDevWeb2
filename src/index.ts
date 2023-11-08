import PacoteViagem from "./models/index.js";
import { MongoClient } from "mongodb";
import database from "./db";

const pacotes: PacoteViagem[] = [
    new PacoteViagem("Brasil", 203062512),
    new PacoteViagem("Estados Unidos", 339987103),
    new PacoteViagem("Egito", 102334404),
    new PacoteViagem("Reino Unido", 67886011),
    new PacoteViagem("Argentina", 45195774)
];

const main = async () => {
    let conn: MongoClient | null = null;
    try {
        conn = await database.getMongoConn();
        const db = conn.db(); // devweb2
        const pacoteCollection = db.collection("pacotes");

        // deleta todos os documentos da coleção
        // Como se fosse: delete from pacotes;
        await pacoteCollection.deleteMany({});
        console.log("Documentos deletados");

        /*// forma verbosa
        for (let pais of pacotes) {
            // Como se fosse: select count(*) from pacotes where nome = ?;
            let qtd = await pacoteCollection.find({nome: pais.nome}).count();
            if (qtd === 0) {
                await pacoteCollection.insertOne(pais);
            }
        }*/

        await pacoteCollection.insertMany(pacotes);
        console.log("Dados inseridos com sucesso!");

        const pacotesFind = await pacoteCollection.find().toArray();
        pacotesFind.forEach((value) => {
            console.log(value)
        });

    } catch (error) {
        console.log(error);
    } finally {
        conn?.close();
    }
}

main();