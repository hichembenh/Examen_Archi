import {GET_INVOiCES,ADD_INVOiCES} from "../utils/types";

export default (books = [], action) => {
    switch (action.type) {
        case GET_INVOiCES:
            return action.payload;
        case ADD_INVOiCES:
            return [...books, action.payload]
        default:
            return books;
    }
}