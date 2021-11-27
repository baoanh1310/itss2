import BaseService from "./BaseService";

class AuthenService extends BaseService {

    constructor() {
        super({
            subURL: ""
        });
    }

    login = (data) => {
        return this.post("authentication/login", data);
    }

    forgotPassword = (data) => {
        return this.post("authentication/forgot-password", data);
    }

    requestverify = (data) => {
        return this.post("request-active-account", data);
    }

    verify = (data) => {
        return this.post("active-account", data);
    }

    requestResetPassword = (data) => {
        return this.post("request-reset-password", data)
    }

    resetPassword = (data) => {
        return this.post("reset-password", data)
    }

    refreshToken = (data) => {
        return this.post("refresh-token", data);
    }
};

export default new AuthenService();