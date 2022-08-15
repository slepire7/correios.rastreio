import { Correio } from './model';
import { Service } from './service/correio_service'
import dayjs from 'dayjs'
import inquirer from 'inquirer'

export namespace Program {
    export async function Main(): Promise<void> {
        let readline = "";
        do {
            readline = <string>(await inquirer.prompt({
                type: 'input',
                name: 'code',
                message: "codigo rastreio correio ?",
            })).code

        } while (IsNullOrEmpty(readline))
        const REGEXVALIDCORREIOS: RegExp = /^[A-Z]{2}[0-9]{9}[A-Z]{2}$/;
        if (REGEXVALIDCORREIOS.test(readline) == false) {
            console.log("Codigo invalido")
            Program.Main();
            return;
        }
        const response = await Service.GetDataRastreio(readline);
        ShowInfoResponse(response);
        const repeat = <boolean>(await inquirer.prompt({
            type: 'confirm',
            name: 'repeat',
            message: 'deseja pesquisar novamente ?'
        })).repeat
        if (repeat)
            await Program.Main()
    }
    function ShowInfoResponse(value: Correio.IResponse) {
        for (const objeto of value.objetos) printObjetoInfo(objeto);
    }
    function printObjetoInfo(object: Correio.Objeto): void {
        console.log("--------------------------------------------")
        console.log(`Data final prevista: ${DateFormat(object.dtPrevista)}`);
        printEventInfo(object.eventos[0]);
        console.log("--------------------------------------------")
    }
    function printEventInfo(evento: Correio.Evento): void {
        console.log(`Descrição: ${evento.descricao}`);
        console.log(`unidade de envio: ${evento.unidade.endereco.cidade}`);
        console.log(`data envio destinatario: ${DateFormat(evento.dtHrCriado)}`);
        console.log(`unidade destino: ${evento.unidadeDestino.endereco.cidade}`);
    }
    function IsNullOrEmpty(val: string | object): boolean {
        const o = typeof val;
        if (!val)
            return true;
        if (o === 'string') {
            let stringVal = val as string;
            if (stringVal.length === 0)
                return true;
            let newVal = stringVal.replace(/^\s+$/, "");
            if (newVal.length === 0)
                return true;
        }
        if (o === 'object')
            return val && Object.keys(val).length === 0

        return false;
    }
    function DateFormat(date: Date, format: string = "DD/MM/YYYY hh:mm"): string {
        return dayjs(date).format(format);
    }
}
Program.Main();