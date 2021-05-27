const express = require('express');
const cache = require('express-redis-cache')({
    auth_pass: process.env.REDIS_PASSWORD,
    prefix: process.env.REDIS_PREFIX,
    expire: 10//60
});

const schemas = require('../validations/schemas');

const validate = require('../validations/validate');
const controllerFactory = require('../controllers/controllerFactory');
const authorController = require('../controllers/authorController');
const errorController = require('../controllers/errorController');

const router = express.Router();

router.route('/authors')
    /**
     * Liste des auteurs
     * @route GET /authors
     * @returns {Author[]} 200 - La liste des auteurs
     * @returns {Error} 500 - Une erreur serveur
     */
    .get(cache.route('authors'), controllerFactory.getAll('author'))
    /**
     * Ajouter un auteur
     * @route POST /authors
     * @param {AuthorInput.model} Author.body.required - Un objet contenant les informations d'un auteur
     * @returns {Author} 200 - L'auteur créer
     * @returns {Error} 500 - Auteur déjà présent dans la BDD
     */
    .post(validate.body(schemas.authorInsertSchema), controllerFactory.add('author'));

router.route('/authors/:id(\\d+)')
    /**
     * Un auteur
     * @route GET /authors/{id}
     * @param {number} id - Identifiant de l'auteur
     * @returns {Author.model} 200 - L'auteur
     * @returns {Error} 500 - Une erreur serveur
     */
    .get(authorController.getById)
    /**
     * Mise à jour d'un auteur
     * @route PATCH /authors/{id}
     * @param {number} id - Identifiant de l'auteur
     * @param {AuthorInput.model} Author.body.required - Un objet  contenant les informations partiels d'un auteur
     * @returns {Author.model} 200 - L'auteur créer
     * @returns {Error} 500 - Une erreur serveur
     */
    .patch(validate.body(schemas.authorUpdateSchema), controllerFactory.update('author'))
    /**
     * Un auteur
     * @route DELETE /authors/{id}
     * @param {number} id - Identifiant de l'auteur
     * @returns {Author} 204 - <empty content>
     * @returns {Error} 500 - Une erreur serveur
     */
    .delete(controllerFactory.delete('author'));

router.route('/books')
    /**
     * Liste des auteurs
     * @route GET /books
     * @returns {Author[]} 200 - La liste des auteurs
     * @returns {Error} 500 - Une erreur serveur
     */
    .get(controllerFactory.getAll('book'))
    /**
     * Ajouter un auteur
     * @route POST /books
     * @param {AuthorInput.model} Author.body.required - Un objet contenant les informations d'un auteur
     * @returns {Author} 200 - L'auteur créer
     * @returns {Error} 500 - Auteur déjà présent dans la BDD
     */
    .post(controllerFactory.add('book'));

router.route('/books/:id(\\d+)')
    /**
     * Un livre
     * @route GET /books/{id}
     * @param {number} id - Identifiant du livre
     * @returns {Book.model} 200 - un livre
     * @returns {Error} 500 - Une erreur serveur
     */
    .get(bookController.getById)
    /**
     * Mise à jour d'un livre
     * @route PATCH /books/{id}
     * @param {number} id - Identifiant du livre
     * @param {BookInput.model} Book.body.required - Un objet  contenant les informations partiels d'un livre
     * @returns {Book.model} 200 - un livre créer
     * @returns {Error} 500 - Une erreur serveur
     */
    .patch(validate.body(schemas.bookUpdateSchema), controllerFactory.update('book'))
    /**
     * Un livre
     * @route DELETE /books/{id}
     * @param {number} id - Identifiant du livre
     * @returns {Book} 204 - <empty content>
     * @returns {Error} 500 - Une erreur serveur
     */
    .delete(controllerFactory.delete('book'));



router.route('/publishers')
    /**
     * Liste des éditeurs
     * @route GET /publishers
     * @returns {Publisher[]} 200 - La liste des éditeurs
     * @returns {Error} 500 - Une erreur serveur
     */
    .get(controllerFactory.getAll('publisher'))
    /**
     * Ajouter un éditeur
     * @route POST /publishers
     * @param {PublisherInput.model} Publisher.body.required - Un objet contenant les informations d'un éditeur
     * @returns {Author} 200 - L'éditeur créer
     * @returns {Error} 500 - Éditeur déjà présent dans la BDD
     */
    .post(validate.body(schemas.publisherInsertSchema), controllerFactory.add('publisher'));

router.route('/publishers/:id(\\d+)')
    /**
     * une maison d'édition
     * @route GET /publishers/{id}
     * @param {number} id - Identifiant de la maison d'édition
     * @returns {Publisher.model} 200 - la maison d'édition
     * @returns {Error} 500 - Une erreur serveur
     */
    .get(publisherController.getById)
    /**
     * Mise à jour d'une maison d'édition
     * @route PATCH /publishers/{id}
     * @param {number} id - Identifiant de la maison d'édition
     * @param {PublisherInput.model} Publisher.body.required - Un objet  contenant les informations partiels d'une maison d'édition
     * @returns {Publisher.model} 200 - la maison d'édition créer
     * @returns {Error} 500 - Une erreur serveur
     */
    .patch(validate.body(schemas.publisherUpdateSchema), controllerFactory.update('publisher'))
    /**
     * une maison d'édition
     * @route DELETE /publishers/{id}
     * @param {number} id - Identifiant de la maison d'édition
     * @returns {Publisher} 204 - <empty content>
     * @returns {Error} 500 - Une erreur serveur
     */
    .delete(controllerFactory.delete('publisher'));


router.route('/genre')
    /**
     * Liste des genre
     * @route GET /genre
     * @returns {Publisher[]} 200 - La liste des genre
     * @returns {Error} 500 - Une erreur serveur
     */
    .get(controllerFactory.getAll('genre'))
    /**
     * Ajouter un genre
     * @route POST /genre
     * @param {GenreInput.model} Genre.body.required - Un objet contenant les informations d'un éditeur
     * @returns {Genre} 200 - Genre créé 
     * @returns {Error} 500 - Genre déjà présent dans la BDD
     */
     .post(validate.body(schemas.genreInsertSchema), controllerFactory.add('genre'));

router.route('/genres/:id(\\d+)')
     /**
      * Un genre
      * @route GET /genres/{id}
      * @param {number} id - Identifiant du genre
      * @returns {Genre.model} 200 - Le genre
      * @returns {Error} 500 - Une erreur serveur
      */
     .get(genreController.getById)
     /**
      * Mise à jour d'un genre
      * @route PATCH /genres/{id}
      * @param {number} id - Identifiant du genre
      * @param {GenreInput.model} Genre.body.required - Un objet  contenant les informations partiels d'un genre
      * @returns {Genre.model} 200 - Le genre créer
      * @returns {Error} 500 - Une erreur serveur
      */
     .patch(validate.body(schemas.genreUpdateSchema), controllerFactory.update('genre'))
     /**
      * Un genre
      * @route DELETE /genres/{id}
      * @param {number} id - Identifiant du genre
      * @returns {Genre} 204 - <empty content>
      * @returns {Error} 500 - Une erreur serveur
      */
     .delete(controllerFactory.delete('genre'));
    
// Resource Not Found
router.use(errorController.resourceNotFound);

module.exports = router;