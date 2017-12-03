import React from 'react'
import { connect } from 'react-redux'
import Flex from '../components/Flex'

import { Icon } from 'react-fa'

import './Layout.css'

class Layout extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            searchQuery: props.search.query
        }
    }

    handleSearchInput(ev) {
        this.setState({ searchQuery: ev.target.value })
    }

    handleSearchSubmit(ev) {
        window.location.assign('/items?q='+this.state.searchQuery)
    }

    render() {
        return (
            <Flex.Column stretch style={{ height: '100%' }}>
                <nav className="flex-row center-a center-b search-bar">
                    <div className="res-img logo-img" />
                        <form action={"javascript:void(0)"}
                            className="search-input-wrap flex-row stretch"
                            onSubmit={ev => this.handleSearchSubmit(ev)}>
                                <input ref={input => this.searchInput = input}
                                    defaultValue={this.props.search.query}
                                    placeholder="Buscar produtos..."
                                    className="search-input"
                                    onChange={this.handleSearchInput.bind(this)} />
                            <Flex.Column centerA centerB className="search-btn" onClick={() => this.searchInput.focus()}>
                                <span className="flex-col" style={{ color: '#777' }}>
                                    <Icon name="search" />
                                </span>
                            </Flex.Column>
                        </form>
                </nav>
                <main className="flex-col flex" style={{ overflowY: 'auto', backgroundColor: 'rgb(238, 238, 238)' }}>
                    { this.props.children }
                </main>
            </Flex.Column>
        )
    }
}

export default connect(({ search }) => ({ search }))(Layout)