import express from "express";
import cors from "cors"
import routers from "./routers";
import database from "./db"

const main = async () => {

    const port = 3000
    const app = express()

    app.use(cors())
    app.use(express.json())
    await database.injectDBInApp(app)

    app.use("/pacotes", routers.pacoteRouter)
    app.use("/users", routers.usersRouter)


    app.listen(port, () => {
        console.log(`servidor rodando na porta ${port}`)
    })

}

main()