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
        return this.getData("/", data);
    }

    getProduct = (id) => {
        return this.getData("/get/"+id);
    }

    updateProduct = (id, data) => {
        return this.put("/update/"+id, data);
    }

    delProducts = (data) => {
        return this.del("/delete", data);
    }
};

export default new ImportService();