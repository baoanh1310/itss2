import BaseService from "./BaseService";

class ExportBillService extends BaseService {
    /**
     *
     */
    constructor() {
        super({
            subURL: "bills/export"
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

export default new ExportBillService();