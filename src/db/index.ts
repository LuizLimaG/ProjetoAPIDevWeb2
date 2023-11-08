import { MongoClient } from 'mongodb'
import { Request, Response, NextFunction } from 'express'
import RequestDB from '../models/request-db'

const uri = "mongodb://Admin:admin@127.0.0.1:27017/devweb2"

const getMongoConn = async (): Promise<MongoClient> => {
    try {
        const client = new MongoClient(uri)
        const conn = await client.connect()

        process.on("SIGINT", () => {
            conn.close()
            console.log("Conexão encerrada com sucesso!")
            process.exit(0)
        })

        return conn
    } catch (error) {
        console.log("Erro na conexão com banco de dados")
        process.exit(1)
    }
}

const injectDBInApp = async (app: any) => {
    const conn = await getMongoConn()
    app.use((req: Request, res: Response, next: NextFunction) => {
        (req as RequestDB).db = conn.db()
        next()
    })
}

export default { getMongoConn, injectDBInApp }