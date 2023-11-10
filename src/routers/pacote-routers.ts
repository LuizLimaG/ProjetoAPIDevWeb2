import express, { Request, Response } from "express";
import PacotesController from "../controllers/pacote-viagem";

const pacoteRouter = express.Router()

pacoteRouter.get("/", PacotesController.buscaPacotePorLocal)
pacoteRouter.post("/", PacotesController.inserirPacote)
pacoteRouter.put("/:id", PacotesController.atualizarPacote)
pacoteRouter.delete("/:id", PacotesController.deletarPacote)

export default pacoteRouter