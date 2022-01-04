import {ADD_BOOK, GET_BOOKS} from "../utils/types";
import * as api from '../utils/API'

export const getBooks = () => async (dispatch) => {
    try {
        const {data} = await api.getBooks()
        dispatch({type: GET_BOOKS, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const addBook = (formData) => async (dispatch) => {
    try {
        const { data } = await api.addBook(formData);
        dispatch({ type: ADD_BOOK, data });
        console.log(data)
    } catch (error) {
        console.log(error);
    }
};