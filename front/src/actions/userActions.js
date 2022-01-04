import {ADD_USERS, GET_USERS} from "../utils/types";
import * as api from '../utils/API'

export const getUsers = () => async (dispatch) => {
    try {
        const {data} = await api.getCustomer()
        dispatch({type: GET_USERS, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const addUser = (formData) => async (dispatch) => {
    try {
        const { data } = await api.addCustomer(formData);
        dispatch({ type: ADD_USERS, data });
        console.log(data)
    } catch (error) {
        console.log(error);
    }
};