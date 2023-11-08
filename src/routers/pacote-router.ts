import express, { Request, Response } from "express";
import PacotesController from "../controllers/pacote-viagem";
import UserControllers from "../controllers/users-controllers";

const pacoteRouter = express.Router()

pacoteRouter.get("/", UserControllers.auth, PacotesController.buscaPacotePorData)
pacoteRouter.post("/:id", UserControllers.auth, PacotesController.inserirPacote)
pacoteRouter.put("/:id", UserControllers.auth, PacotesController.atualizarPacote)
pacoteRouter.delete("/:id", UserControllers.auth, PacotesController.deletarPacote)

export default pacoteRouter
