import { Request, Response } from "express"
import { ObjectId } from "mongodb"
import PacoteViagem from "../models"
import PacotesServices from "../services/pacotes-services"
import RequestDB from "../models/request-db"

export default class PacotesController {

    static async buscaPacotePorData(req: Request, res: Response) {

        try {

            const db = (req as RequestDB).db
            const pacoteService = new PacotesServices(db)
            let dataNumber: Number

            try {
                const { data } = req.query
                dataNumber = pacoteService.validarParametroData(data)
            } catch (error) {
                const message = (error as Error).message
                res.status(400).json({
                    message
                })
                return
            }

            res.status(200).json(await pacoteService.buscarPacotePorData(dataNumber))

        } catch (err) {
            res.status(500).json((err as Error).message)
        }
    }

    static async inserirPacote(req: Request, res: Response) {
        
        try {

            const db = (req as RequestDB).db
            const pacoteService = new PacotesServices(db)

            let pacote: PacoteViagem

            try {
                const record = req.body
                pacote = pacoteService.validar(record)
            } catch (error) {
                const message = (error as Error).message
                res.status(400).json({
                    message
                })
                return
            }

            await pacoteService.inserir(pacote)
            res.status(201).json(pacote)

        } catch (err) {
            const message = (err as Error).message
            res.status(500).json({
                message
            })
        }

    }

    static async atualizarPacote(req: Request, res: Response) {
        const id = req.params.id

        let objectId: ObjectId

        try {
            objectId = new ObjectId(id)
        } catch (error) {
            res.status(400).json({ message: "Id informado inválido" })
            return
        }

        try {
            const db = (req as RequestDB).db
            const pacoteService = new PacotesServices(db)

            if (await pacoteService.existe(objectId)) {
                let pacote: PacoteViagem
                try {
                    const record = req.body
                    pacote = pacoteService.validar(record)
                } catch (error) {
                    res.status(400).json({ message: (error as Error).message })
                    return
                }

                await pacoteService.atualizar(objectId, pacote)
                res.status(200).json(pacote)

            } else {
                res.status(404).json({ message: "O pacote não existe." })
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message })
        }

    }

    static async deletarPacote(req: Request, res: Response) {

        const id = req.params.id
        let objectId: ObjectId
        try {
            objectId = new ObjectId(id)
        } catch (error) {
            res.status(400).json({ message: "Id informado inválido" })
            return
        }

        try {
            const db = (req as RequestDB).db
            const pacoteService = new PacotesServices(db)
            if (await pacoteService.existe(objectId)) {
                await pacoteService.deletar(objectId)
                res.status(204).send("")
            } else {
                res.status(404).json({ message: "O pacote não existe." })
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message })
        }

    }

}