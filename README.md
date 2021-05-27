# Bookshelf

Ceci est une API de gestion de bibliothèque ouverte à tous.

## Auteurs

- [@Segolene-Danjou](https://github.com/Segolene-Danjou)

## Stack

- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](http://nodejs.org/)
- [Sqitch](https://sqitch.org/)
- [Express](http://expressjs.com/)
- [node-postgres](https://node-postgres.com/)
- [Joi](http://joi.dev/)
- [dotenv](https://www.npmjs.com/package/dotenv)

## Run Locally

Clonez le projet

```bash
  git clone https://github.com/Segolene-Danjou/bookshelf.git
```

Rendez-vous dans le répertoire racine du projet

```bash
  cd my-project
```

Installez la base de données PostgreSQL

```bash
createdb my_bookshelf
```

Afin de déployer la BDD, indqiuer les informations de connexion nécessaire dans un fichier `./sqitch.conf` à l'image du `./sqitch.example.conf`.

Puis :

```bash
sqitch deploy
```

Installation de dépendences

```bash
  npm install
```

Démarrage du serveur

```bash
  npm run start
```