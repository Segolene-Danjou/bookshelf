const models = {
    author: require('../models/authorModel'),
    book: require('../models/bookModel'),
    publisher: require('../models/publisherModel'),
    genre: require('../models/genreModel')
};

const controllerFactory = {

    getAll(entityName) {
        return async (_, response) => {
            console.log('controller getAll');
            try {
                const entities = await models[entityName].find();
                response.json({ data: entities.map(entity => entity.dataValues) });
            } catch (error) {
                console.trace(error);
                response.json({ error });
            }
        }
    },

    getById(entityName) {
        return async (request, response, next) => {
            console.log('controller getById');
            try {
                const entity = await models[entityName].findByPk(request.params.id);

                if (!entity) {
                    return next();
                }

                response.json({ data: entity.dataValues });
            } catch (error) {
                console.trace(error);
                response.json({ error });
            }
        }
    },

    add(entityName) {
        return async (request, response) => {
            try {
                const entity = new models[entityName](request.body);
                await entity.insert();
                response.json({ data: entity.dataValues });
            } catch (error) {
                console.trace(error);

                if (error.code === '23505') {
                    error = `This resource already exists.`;
                } else {
                    error = `A server error occured, please retry later.`;
                }
                response.json({ error });
            }
        }
    },

    update(entityName) {
        return async (request, response, next) => {
            try {
                const entity = await models[entityName].findByPk(request.params.id);

                if (!entity) {
                    return next();
                }

                entity.data = request.body;

                await entity.update();
                response.json({ data: entity.dataValues });
            } catch (error) {
                console.trace(error);
                error = `A server error occured, please retry later.`;
                response.json({ error });
            }
        }
    },

    delete(entityName) {
        return async (request, response, next) => {
            try {
                const entity = await models[entityName].findByPk(request.params.id);

                if (!entity) {
                    return next();
                }

                await entity.delete();
                response.status(204).json();
            } catch (error) {
                console.trace(error);
                error = `A server error occured, please retry later.`;
                response.json({ error });
            }
        }
    }


}

module.exports = controllerFactory;