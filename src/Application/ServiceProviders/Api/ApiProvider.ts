import axios, {AxiosResponse} from "axios";

export class ApiProvider {
    public url: string;
    public body: any;
    public headers: any = {};

    public async get(): Promise<AxiosResponse>{
        const headers = this.headers;
        return await axios.get(this.url, {headers});
    }

    public async post(): Promise<AxiosResponse>{
        const headers = this.headers;
        return await axios.post(this.url, this.body, {headers});
    }
}