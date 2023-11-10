export default class PacoteViagem {
    
    local: string
    dataIda: string
    dataVolta: string
    passagemIda: string
    passagemVolta: string

    constructor (local: string, dataIda: string, dataVolta: string, passagemIda: string, passagemVolta: string) {
        this.local = local
        this.dataIda = dataIda
        this.dataVolta = dataVolta
        this.passagemIda = passagemIda
        this.passagemVolta = passagemVolta
    }
    
}