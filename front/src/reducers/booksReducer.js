import {GET_BOOKS,ADD_BOOK} from "../utils/types";

export default (books = [], action) => {
    switch (action.type) {
        case GET_BOOKS:
            return action.payload;
        case ADD_BOOK:
            return [...books, action.payload]
        default:
            return books;
    }
}