import { AxiosRequestConfig, AxiosResponse } from 'axios';
declare class Auth {
    #private;
    constructor(config?: AxiosRequestConfig, statusCodes?: number[], callback?: Function);
    set statusCodes(newStatusCodes: any);
    login(pathLogin: string, data: any): Promise<AxiosResponse>;
}
export { Auth };
