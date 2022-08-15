import { Correio, User } from "../model";

import { BaseRequest } from "./base_request";

export namespace Service {
    export async function GetDataRastreio(rastreio: string) {
        BaseRequest.setBaseUrl("https://proxyapp.correios.com.br/v1/sro-rastro/")
        return BaseRequest.Get<Correio.IResponse>(rastreio)
    }
}