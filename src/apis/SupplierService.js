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

    create = (data) => {
        return this.post('/', data);
    }

    getSuppliers = (data) => {
        return this.getData("/", data);
    }

    getSupplier = (id) => {
        return this.getData("/"+id);
    }

    updateSupplier = (id, data) => {
        return this.put("/"+id, data);
    }

    delSuppliers = (id, data) => {
        return this.del("/"+id);
    }
};

export default new SupplierService();