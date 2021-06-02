const CoreModel = require('./coreModel');

/**
 * @typedef Genre
 * @property {number} id - Identifiant unique
 * @property {string} label - Genre du livre
 */

/**
 * @typedef GenreInput
* @property {string} label - Genre du livre
 */

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