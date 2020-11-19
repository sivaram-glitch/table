import { createStore,combineReducers } from 'redux';
import table from './components/reducers/Table';

const rootReducer = combineReducers({
    table
});

const store = createStore(rootReducer);
export default store;
