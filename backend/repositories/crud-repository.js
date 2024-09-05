const AppError = require('../utils/error/app-error');

class CrudRepository{
    constructor(model){
        this.model = model
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }
    
    async get(data) {
        const response = await this.model.findByPk(data);
        if(!response) {
            throw new AppError('Not able to find the requested resource', 404);
        }
        return response;
    }

    async getAll() {
        const respone = await this.model.findAll();
        return respone;
    }

    async update(id, data) {
        const response = await this.model.update(data,{
            where: {
                id: id
            }
        })
        if(response == 0) {
            throw new AppError('Not able to find the requested resource', 404);
        }
        return response;
    }

    async destroy(data) {
        const response = await this.model.destroy({
            where: {
                id: data
            }
        })
        if(!response) {
            throw new AppError('Not able to find the requested resource', 404)
        }
        return response
    }
}

module.exports = CrudRepository;