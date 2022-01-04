import {ADD_INVOiCES, GET_INVOiCES} from "../utils/types";
import * as api from '../utils/API'

export const getInvoices = () => async (dispatch) => {
    try {
        const {data} = await api.getBillings()
        dispatch({type: GET_INVOiCES, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const addInvoice = (formData) => async (dispatch) => {
    try {
        const { data } = await api.addBilling(formData);
        dispatch({ type: ADD_INVOiCES, data });
        console.log(data)
    } catch (error) {
        console.log(error);
    }
};