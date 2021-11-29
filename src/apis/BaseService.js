import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import get from "lodash/get";
import { StatusCode } from "./apiConstants";
import { endpoint, timeout } from "./config";

import LocalStorageService from "../services/LocalStorageService";
import { LocalStorageKeys } from "./localStorageKeys";

class BaseService {

    mAxios = AxiosInstance;

    constructor(config) {
        this.initialAxiosInstance(config);
    }

    initialAxiosInstance = (config) => {
        const subUrl = config.subURL || "";
        let baseURL = config.endpoint || endpoint;
        if (!!subUrl) {
            baseURL += `${subUrl}`
        }
        this.mAxios = axios.create({
            baseURL,
            timeout,
            ...config
        });

        // Config interceptors
        this.mAxios.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem(LocalStorageKeys.Token);
                if (token && !get(config, "ignoreAuth", false)) {
                    config.headers.Authorization = "Bearer " + token;
                }
                // add lenguage
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );

        this.mAxios.interceptors.response.use(
            (res) => {
                // Any status code that lie within the range of 2xx cause this function to trigger
                // Do something with response data
                // console.log('interceptors::response', res);
                const notificationMsgs = get(res, "config.notificationMsgs", null);
                const appLoading = get(res, "config.appLoading", false);
                if (notificationMsgs && notificationMsgs.successMsg) {
                    this.mNotification.success(notificationMsgs.successMsg);
                }
                return res;

            },
            (err) => {
                // Any status codes that falls outside the range of 2xx cause this function to trigger
                // Do something with response error
                const notificationMsgs = get(err, "config.notificationMsgs", null);
                if (notificationMsgs && notificationMsgs.errorMsg) {
                    this.mNotification.warning(notificationMsgs.errorMsg);
                    return Promise.reject(err);
                }
                const status = get(err, "response.status");
                const msg = get(err, "response.message");
                switch (status) {
                    case StatusCode.NotFound:
                        msg && this.mNotification.warning(msg);
                        break;
                    default:
                        msg && this.mNotification.warning(msg);
                        break;
                }
                return Promise.reject(err);
            }
        );
    }

    request = (config) => {
        return this.mAxios.request(config)
    }

    post = (url, data, config) => {
        return this.mAxios.post(url, data, config);
    }

    get = (url, config) => {
        return this.mAxios.get(url, config);
    }

    delete = (url, config) => {
        return this.mAxios.delete(url, config);
    };

    put = (url, data, config) => {
        return this.mAxios.put(url, data, config);
    };

    patch = (url, data, config) => {
        return this.mAxios.patch(url, data, config);
    };

}

export default BaseService