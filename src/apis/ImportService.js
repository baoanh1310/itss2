import BaseService from "./BaseService";

class ImportService extends BaseService {
    /**
     *
     */
    constructor() {
        super({
            subURL: "warehouse/import"
        });
    }

    create = (data) => {
        return this.post('/', data);
    }

    getProducts = (data) => {
        return this.get("/", data);
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

export default new ImportService();