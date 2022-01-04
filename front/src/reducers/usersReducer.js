import {ADD_USERS, GET_USERS} from "../utils/types";


export default (state = {authData: null}, users = [], action) => {
    switch (action?.type) {
        case GET_USERS:
            return action.payload;
        case ADD_USERS:
            localStorage.setItem('profile', JSON.stringify({...action.data}))
            return {...state, authData: action.data};
        default:
            return users
    }
}
