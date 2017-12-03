const fetch = require('node-fetch')
const AUTHOR = require('./author.json')

const ML_ITEM_URL = "https://api.mercadolibre.com/items"

const ItemModel = {
    get: id => new Promise((resolve, reject) => {
        Promise.all([
            fetch(`${ML_ITEM_URL}/${id}`),
            fetch(`${ML_ITEM_URL}/${id}/description`)
        ])
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(([ item, item_desc ]) => {
            resolve({
                "author": AUTHOR,
                "item": {
                    "id": item.id,
                    "title": item.title,
                    "price": {
                        "currency": item.currency_id,
                        "amount": Math.floor(item.price),
                        "decimals": item.price - Math.floor(item.price) 
                    },
                    "picture": item.thumbnail,
                    "condition": item.condition,
                    "free_shipping": item.shipping.free_shipping,
                    "sold_quantity": item.sold_quantity,
                    "description": item_desc.plain_text
                },
            })
        })
        .catch(e => reject(e))        
    })
}

module.exports = ItemModel