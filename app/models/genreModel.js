const CoreModel = require('./coreModel');

class GenreModel extends CoreModel {
    
    /**
     * Nom de la table dans la BDD
     */
    static tableName = 'genre';

    /**
     * Listes des champs de l'entité 
     */
    static fields = [
        'label'
    ];

    /**
     * Initialisation/instanciation de la classe
     * @param {object} obj 
     */
    constructor(obj){
        super(obj);
    };

}

module.exports = GenreModel;