export namespace Correio {

    export interface Endereco {
        cidade: string;
        uf: string;
    }

    export interface Unidade {
        endereco: Endereco;
        tipo: string;
    }
    
    export interface UnidadeDestino {
        endereco: Endereco;
        tipo: string;
    }

    export interface Evento {
        codigo: string;
        descricao: string;
        dtHrCriado: Date;
        tipo: string;
        unidade: Unidade;
        unidadeDestino: UnidadeDestino;
        urlIcone: string;
        detalhe: string;
    }

    export interface TipoPostal {
        categoria: string;
        descricao: string;
        sigla: string;
    }

    export interface Objeto {
        codObjeto: string;
        dtPrevista: Date;
        eventos: Evento[];
        modalidade: string;
        tipoPostal: TipoPostal;
        habilitaAutoDeclaracao: boolean;
        permiteEncargoImportacao: boolean;
        habilitaPercorridaCarteiro: boolean;
        bloqueioObjeto: boolean;
        possuiLocker: boolean;
        habilitaLocker: boolean;
        habilitaCrowdshipping: boolean;
    }

    export interface IResponse {
        objetos: Objeto[];
        quantidade: number;
        resultado: string;
        versao: string;
    }
}