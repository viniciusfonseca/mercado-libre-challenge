import url from 'url';
import { matchPath } from 'react-router-dom';
global.fetch = require('node-fetch')

import Home from '../src/pages/Home';
import Search from '../src/pages/Search'
import Product from '../src/pages/Product'

const routesThatFetchData = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/items',
    component: Search,
    exact: true
  },
  {
    path: '/items/:id',
    component: Product,
    exact: true
  }
];

const fetchDataForRender = (req, store) => {
  const promises = [];

  routesThatFetchData.some(route => {
    const match = matchPath(url.parse(req.url).pathname, route);
    const query = new Map((url.parse(req.url).query || '').split('&').map(kv => kv.split('=')))
    if (match) {
      const promise = (route.component &&
        route.component.fetchData &&
        route.component.fetchData(store, match, query));
      promises.push(promise);
    }
    return match;
  });

  return Promise.all(promises);
}

export default fetchDataForRender;
