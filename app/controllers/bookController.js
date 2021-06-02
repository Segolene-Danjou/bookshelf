const BookModel = require('../models/bookModel');

module.exports = {

    async getById(request, response, next){
        try {
            const book = await BookModel.findByPk(request.params.id);
            console.log("book controller");
            if(!book){
                return next();
            }

            book.dataValues.test = 1;

            response.json({ data: book.dataValues });
        } catch (error) {
            console.trace(error);
            response.json({ error });
        }
    }

}