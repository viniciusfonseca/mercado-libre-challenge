const fetch = require('node-fetch')
const AUTHOR = require('./author.json')

const ML_SEARCH_URL = "https://api.mercadolibre.com/sites/MLA/search"

const SearchModel = {
    fetch: kw => new Promise((resolve, reject) => {
        fetch(`${ML_SEARCH_URL}?q=${kw}`).then(res => res.json())
            .then(response => {
                response.results = response.results.slice(0, 4)
                resolve({
                    "author": AUTHOR,
                    "categories": (
                        (
                            (
                                response.available_filters
                                    .find(filter => filter.id == "category") || {}
                            ).values || []
                        )
                        .map(category => category.id)
                    ),
                    "items": response.results.map(result => ({
                        "id": result.id,
                        "title": result.title,
                        "price": {
                            "currency": result.currency_id,
                            "amount": Math.floor(result.price),
                            "decimals": result.price - Math.floor(result.price)
                        },
                        "picture": result.thumbnail,
                        "condition": result.condition,
                        "free_shipping": result.shipping.free_shipping
                    }))
                })
            })
            .catch(e => reject(e))
    })
}

module.exports = SearchModel