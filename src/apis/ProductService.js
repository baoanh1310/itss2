import BaseService from "./BaseService";

class ProductService extends BaseService {
    /**
     *
     */
    constructor() {
        super({
            subURL: "products"
        });
    }

    upload = (data) => {
        return this.post('/upload', data, {
            "Content-Type": "multipart/form-data"
        });
    }

    getData = (data) => {
        return this.post("/get", data);
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

export default new ProductService();