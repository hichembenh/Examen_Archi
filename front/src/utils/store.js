import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import usersReducer from "../reducers/usersReducer";
import invoicesReducer from "../reducers/invoicesReducer";
import booksReducer from "../reducers/booksReducer";

const reducer = combineReducers({
    usersReducer,
    invoicesReducer,
    booksReducer
})
const initalState = {}

const middleware = [thunk]

const store = createStore(reducer, initalState, composeWithDevTools(applyMiddleware(...[thunk])))

export default store;