const client = require('../client');
const CoreModel = require('./coreModel');

/**
 * @typedef Book
 * @property {number} id - Identifiant unique
 * @property {string} reference - Référence du livre
 * @property {string} title - Titre du livre
 * @property {string} locale - Langue et pays du livre
 * @property {string} year - Date de publication du livre (YYYY-MM-DD)
 * @property {number} page_count - Nombre de pages
 * @property {number} chapter_count - Nombre de chapitres
 * @property {string} front_cover - Page de garde
 * @property {string} cover - Première de couverture
 * @property {number} publisher_id - id de la maison d'édition
 * @property {string} created_at - Date de création du livre (date ISO 8601)
 * @property {string} updated_at - Date de mise à jour du livre (date ISO 8601)
 * @property {string} deleted_at - Date de suppression du livre (date ISO 8601)
 */

/**
 * @typedef BookInput
 * @property {string} reference - Référence du livre
 * @property {string} title - Titre du livre
 * @property {string} locale - Langue et pays du livre
 * @property {string} year - Date de publication du livre (YYYY-MM-DD)
 * @property {number} page_count - Nombre de pages
 * @property {number} chapter_count - Nombre de chapitres
 * @property {string} front_cover - Page de garde
 * @property {string} cover - Première de couverture
 * @property {number} publisher_id - id de la maison d'édition
 */

class BookModel extends CoreModel {

    /**
         * Nom de la table dans la BDD
         */
    static tableName = 'book';

    /**
     * Listes des champs de l'entité 
     */
    static fields = [
        'reference',
        'title',
        'locale',
        'year',
        'page_count',
        'chapter_count',
        'front_cover',
        'publisher_id',
        'author_id',
        'genre_id'
    ];

    /**
     * Initialisation/instanciation de la classe
     * @param {object} obj 
     */
    constructor(obj) {
        super(obj);
    }
    
    /**
     * Récupération de plusieurs entités
     * @param {object} options objet contenant des parmaètres de filtrage
     * @returns {object[]} Liste d'es 'instances
     */
    static async find(options) {
        const result = await client.query(`
            SELECT 
                book.*,
                ARRAY_AGG(DISTINCT genre.id) as genre_id,
                ARRAY_AGG(DISTINCT author.id) as author_id
            FROM ${this.tableName} 
            JOIN book_has_genre ON book.id = book_has_genre.book_id
            JOIN genre ON genre.id = book_has_genre.genre_id
            JOIN book_has_author ON book.id = book_has_author.book_id
            JOIN author ON author.id = book_has_author.author_id
            WHERE book.deleted_at IS NULL
            GROUP BY book.id
         `);

        const instanceList = [];

        for (const row of result.rows) {
            instanceList.push(new this(row));
        }

        return instanceList;
    };

    static async findByPk(id) {
        console.log('find by pk bookModel');
        const result = await client.query(`SELECT 
        book.*,
        ARRAY_AGG(DISTINCT genre.id) as genre_id,
        ARRAY_AGG(DISTINCT author.id) as author_id
        FROM ${this.tableName} 
        JOIN book_has_genre ON book.id = book_has_genre.book_id
        JOIN genre ON genre.id = book_has_genre.genre_id
        JOIN book_has_author ON book.id = book_has_author.book_id
        JOIN author ON author.id = book_has_author.author_id WHERE id = $1
        GROUP BY book.id`, [id]);

        if (!result.rows[0]) {
            return null;
        }
        return new this(result.rows[0]);
    };

    async insert() {
        try {
            await super.insert();
            
            if (this.dataValues.id) {
                for (const genre_id of this.dataValues.genre_id) {
                    await client.query(`INSERT INTO book_has_genre (book_id, genre_id) VALUES ($1, $2)`, [this.dataValues.id, genre_id])
                }

                for (const author_id of this.dataValues.author_id) {
                    await client.query(`INSERT INTO book_has_author (book_id, author_id) VALUES ($1, $2)`, [this.dataValues.id, author_id])
                }
            }
        } catch (error) {
            console.trace(error)
        }

    }

}

module.exports = BookModel;