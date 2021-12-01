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

export default new ProductService();