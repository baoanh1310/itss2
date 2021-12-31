import BaseService from "./BaseService";

class ToolService extends BaseService {
    /**
     *
     */
    constructor() {
        super({
            subURL: "tools"
        });
    }

    create = (data) => {
        return this.post('/', data);
    }

    getTools = (data) => {
        return this.getData("/", data);
    }

    getTool = (id) => {
        return this.getData("/"+id);
    }

    updateTool = (id, data) => {
        // return this.put("/"+id, data);
        return this.patch("/"+id, data);
    }

    delTools = (id, data) => {
        return this.del("/"+id);
    }
};

export default new ToolService();