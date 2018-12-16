import { combineReducers, createStore } from 'redux';
import rulesReducer from '../reducers/rules.ducks';

const reducer = combineReducers({
  rules: rulesReducer
});

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
