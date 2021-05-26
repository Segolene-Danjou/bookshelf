const CoreModel = require('./coreModel');

class GenreModel extends CoreModel {

    static tableName = 'genre';

    static fields = [
        'genre'
    ];

    constructor(obj){
        super(obj);
    };

}

module.exports = GenreModel;