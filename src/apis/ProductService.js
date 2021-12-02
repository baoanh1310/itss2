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
        return this.getData("/"+id);
    }

    updateProduct = (id, data) => {
        return this.patch("/"+id, data);
    }

    delProducts = (id) => {
        return this.del("/"+id);
    }
};

export default new ProductService();