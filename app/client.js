const { Pool } = require('pg');


const redis = require("redis");
// Module natif de node qui permet de transformer un systeme a callback en promesses
const { promisify } = require("util");
const client = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    prefix: 'bookshelf'
});

// On promessifie client.get et set
const get = promisify(client.get).bind(client);
const set = promisify(client.set).bind(client);

// on exporte les 2 méthodes get et set ce qui correspond à query en pg
module.exports = new Pool(), { get, set };