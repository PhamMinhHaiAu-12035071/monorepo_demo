import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import _ from 'lodash';

class Auth {
    readonly #_client: AxiosInstance;
    #_statusCodes: Array<number>;
    #_callback: Function;

    constructor(config?: AxiosRequestConfig, statusCodes = [401], callback: Function = () => void 0) {
        this.#_client = axios.create(config);
        this.statusCodes = statusCodes;
        this.#_callback = callback;
        this.#_onBeforeRequest();
        this.#_onBeforeResponse();
    }

    public set statusCodes(newStatusCodes) {
        this.#_statusCodes = _.uniq(newStatusCodes);
    }

    public async login(pathLogin: string, data: any): Promise<AxiosResponse> {
        return this.#_client.post(pathLogin, data);
    }

    #_onBeforeRequest(): void {
        this.#_client.interceptors.request.use(function (config) {
            console.log(`[_onBeforeRequest]: ${config}`);
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
        return;
    }

    #_onBeforeResponse(): void {
        this.#_client.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            console.log(`[_onBeforeResponse]: ${response}`);
            return response;
        }, error => {
            if (this.#_statusCodes.indexOf(error.response.status) !== -1) {
                console.log('co loi xay ra');
                this.#_callback();
            }
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        });
    }
}

export {Auth};