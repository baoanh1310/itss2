import BaseService from "./BaseService";

class ExportService extends BaseService {
    /**
     *
     */
    constructor() {
        super({
            subURL: "warehouses/export"
        });
    }

    create = (data) => {
        return this.post('/', data);
    }

    getProducts = (data) => {
        return this.getData("/", data);
    }

    getProductsType = (type) => {
        return this.getData("/type="+type)
    }

    getProduct = (id) => {
        return this.getData("/get/"+id);
    }

    updateProduct = (id, data) => {
        return this.put("/update/"+id, data);
    }

    delProducts = (id) => {
        return this.del("/"+id);
    }
};

export default new ExportService();