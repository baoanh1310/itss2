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
        return this.put("/update/"+id, data);
    }

    delSuppliers = (data) => {
        return this.del("/delete", data);
    }
};

export default new SupplierService();