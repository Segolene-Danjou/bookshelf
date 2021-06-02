const GenreModel = require('../models/genreModel');

module.exports = {

    async getById(request, response, next){
        try {
            const genre = await GenreModel.findByPk(request.params.id);

            if(!genre){
                return next();
            }

            genre.dataValues.test = 1;

            response.json({ data: genre.dataValues });
        } catch (error) {
            console.trace(error);
            response.json({ error });
        }
    }

}