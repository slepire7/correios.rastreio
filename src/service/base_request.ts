import axios from 'axios';

export class BaseRequest {
    private static Url: string;
    static setBaseUrl(url: string) {
        this.Url = url;
    }
    static async Get<TResponse>(rastreio: string): Promise<TResponse> {
        const fetchRequest = await axios.get<TResponse>(this.Url + rastreio)
        if (fetchRequest.status !== 200)
            throw {
                message: "erro ao realizar request",
                statusCode: fetchRequest.status
            }
        const data = await fetchRequest.data
        return <TResponse>data;
    }
}