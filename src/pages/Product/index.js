import React from 'react'
import { connect } from 'react-redux'
import Flex from '../../components/Flex'

import './Product.css'

const ML_ITEM_URL = "http://localhost:3000/api/items"

class Product extends React.Component {

    static fetchData(store, match, queryMap) {
        return fetch(`${ML_ITEM_URL}/${match.params.id}`).then(r => r.json())
            .then(res => {
                store.dispatch({
                    type: 'ITEM',
                    item: res.item
                })
            })
    }

    render() {
        return (
            <section className="page" style={{ alignSelf: 'center' }}>
            {
                <div>
                    <Flex.Row>
                        <div className="res-img item-pic" style={{ flex: 7, backgroundImage: 'url(' + this.props.item.picture + ')' }} />
                        <Flex.Column style={{ flex: 3 }}>
                            <h4 style={{ fontWeight: 'normal' }}>
                                { this.props.item.title }
                            </h4>
                            {
                                this.props.item.price && (
                                    <span className="flex-row" style={{ marginTop: 0, fontSize: '44px' }}>
                                        $ { this.props.item.price.amount }
                                        <span style={{ marginTop: '6px', fontSize: '20px' }}>
                                            { this.props.item.price.decimals.toString().padStart(2, '0') }
                                        </span>
                                    </span>
                                )
                            }
                            <button className="item-buy">
                                Comprar
                            </button>
                        </Flex.Column>
                    </Flex.Row>
                    <h2 style={{ fontWeight: 'normal' }}> Descrição do Produto </h2>
                    <p style={{ whiteSpace: 'pre-line' }}> { this.props.item.description || <em> Este produto não possui uma descrição disponível. </em> } </p>
                </div>
            }
            </section>
        )
    }
}

export default connect(({ item }) => ({ item }))(Product)