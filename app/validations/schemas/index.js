const { 
    insertSchema: authorInsertSchema, 
    updateSchema: authorUpdateSchema,
}  = require('./authorSchema');

const { 
    insertSchema: publisherInsertSchema, 
    updateSchema: publisherUpdateSchema,
}  = require('./publisherSchema');

const { 
    insertSchema: genreInsertSchema, 
    updateSchema: genreUpdateSchema,
}  = require('./genreSchema');

const { 
    insertSchema: bookInsertSchema, 
    updateSchema: bookUpdateSchema,
}  = require('./bookSchema');

module.exports = { authorInsertSchema, authorUpdateSchema, publisherInsertSchema, publisherUpdateSchema, genreInsertSchema, genreUpdateSchema, bookInsertSchema, bookUpdateSchema};