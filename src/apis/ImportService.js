import BaseService from "./BaseService";

class ImportService extends BaseService {
    /**
     *
     */
    constructor() {
        super({
            subURL: "warehouses/import"
        });
    }

    create = (data) => {
        return this.post('/', data);
    }

    getProducts = (data) => {
        return this.getData("/", data);
    }

    getProduct = (id) => {
        return this.getData("/"+id);
    }

    getProductsType = (type) => {
        return this.getData("?type="+type)
    }

    updateProduct = (id, data) => {
        return this.put("/"+id, data);
    }

    delProducts = (id) => {
        return this.del("/"+id);
    }
};

export default new ImportService();