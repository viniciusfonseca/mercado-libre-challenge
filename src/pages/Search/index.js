import React from 'react'
import { connect } from 'react-redux'
import Flex from '../../components/Flex'

import FormatPrice from '../../components/FormatPrice'

import { Icon } from 'react-fa'
import './Search.css'

const ML_SEARCH_URL = "http://localhost:3000/api/items"

class Search extends React.Component {

    static fetchData (store, match, queryMap) {
        const query = queryMap.get('q')
        store.dispatch({
            type: 'SEARCH_QUERY',
            query
        })
        return fetch(`${ML_SEARCH_URL}?q=${query}`)
            .then(r => r.json())
            .then(({ items }) => {
                store.dispatch({
                    type: 'SEARCH_RESULT',
                    items
                })
            })
    }

    constructor(props, context) {
        super(props, context)

        this.state = {
            loading: true,
            items: []
        }
    }

    render() {
        return (
            <section className="page" style={{ alignSelf: 'center' }}>
                {
                    this.props.search.items.length === 0 ? (
                        <h5 style={{ color: '#969696', margin: 0 }}> Nenhum item encontrado. </h5>
                    ) : (
                        <section>
                            <h5 style={{ color: '#969696', margin: 0 }}> Resultados da busca por "{ decodeURIComponent(this.props.search.query) }"</h5>
                            {
                                this.props.search.items.map(item =>
                                    <article key={item.id} className="flex-row list-item">
                                        <div className="res-img thumbnail" style={{ backgroundImage: 'url(' + item.picture + ')' }} />
                                        <Flex.Column flex style={{ marginLeft: '7px' }}>
                                            <h3 style={{ fontWeight: 'normal', marginBottom: 0 }}> $ {FormatPrice(item.price.amount)}{item.price.decimals ? item.price.decimals.toFixed(2).replace(/^0/,''):''} </h3>
                                            <a href={"/items/" + item.id} className="item-link"> { item.title } </a>
                                        </Flex.Column>
                                        <Flex.Column>
                                            <button>
                                                Incluir no Carrinho <Icon name="cart-plus" />
                                            </button>
                                        </Flex.Column>
                                    </article>
                                )
                            }
                        </section>
                    )
                }
            </section>
        )
    }
}

export default connect(({ search }) => ({ search }))(Search)