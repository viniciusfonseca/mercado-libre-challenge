export default function(app) {
    const SearchModel = require('./models/SearchModel')
    const ItemModel = require('./models/ItemModel')
    
    app.get('/api/items', (req, res) => {

        SearchModel.fetch(req.query.q)
            .then(results => res.send(results))
            .catch(error => res.status(500).send('500 Internal Error: ' + error))
    })
    
    app.get('/api/items/:id', (req, res) => {
    
        ItemModel.get(req.params.id)
            .then(item => res.send(item))
            .catch(error => res.status(500).send('500 Internal Error'))
    })
}