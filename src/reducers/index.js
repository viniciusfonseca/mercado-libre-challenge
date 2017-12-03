import { combineReducers } from 'redux';

import session from './sessionReducer';
import search from './searchReducer'
import item from './itemReducer'

const appReducer = combineReducers({
  session,
  search,
  item
});

const rootReducer = (state, action) => {
  if (action.type === 'DESTROY_SESSION') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

export * from './sessionReducer';
