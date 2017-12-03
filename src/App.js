import React from 'react';

import Layout from './pages/Layout'

import Home from './pages/Home'
import Search from './pages/Search'
import Product from './pages/Product'

import './App.css'

import { Switch, Route } from 'react-router-dom'

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Layout>
          <Route path="/" exact component={ Home } />
          <Route path="/items" exact component={ Search } />
          <Route path="/items/:id" exact component={ Product } />
        </Layout>
      </Switch>
    );
  }
}
