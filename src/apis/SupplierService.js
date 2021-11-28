import BaseService from "./BaseService";

class SupplierService extends BaseService {
    /**
     *
     */
    constructor() {
        super({
            subURL: "suppliers"
        });
    }

    upload = (data) => {
        return this.post('/upload', data, {
            "Content-Type": "multipart/form-data"
        });
    }

    getProducts = (data) => {
        return this.get("/get", data);
    }

    getProduct = (id) => {
        return this.get("/get/"+id);
    }

    updateProduct = (id, data) => {
        return this.put("/update/"+id, data);
    }

    delProducts = (data) => {
        return this.delete("/delete", data);
    }
};

export default new SupplierService();