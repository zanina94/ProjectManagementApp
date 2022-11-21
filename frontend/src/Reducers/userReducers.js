import { USER_LOGIN_REQUEST,
         USER_LOGIN_SUCCESS,
         USER_LOGIN_FAIL,
         USER_REGISTER_FAIL, 
         USER_REGISTER_REQUEST, 
         USER_REGISTER_SUCCESS, 
         USER_LOGOUT,
         LIST_USERS_REQUEST,
         LIST_USERS_SUCCESS,
         LIST_USERS_FAIL,
        } from "../Constants/userConstants";

const initialState = {
    token : localStorage.getItem('token') || null,
    userInfo : JSON.parse(localStorage.getItem('userInfo')) || {},
    loading :false,
    isAuth : Boolean(localStorage.getItem('isAuth')) || false,
    errors : null
}

export const authUserReducer = (state =initialState,action) =>{
   switch (action.type) {
    case USER_REGISTER_REQUEST:
        return({...state,loading: true})  
    case USER_REGISTER_SUCCESS:
        return ({...state, token : action.payload.token, userInfo : action.payload.user, loading: false, errors : null})
    case USER_REGISTER_FAIL:
        return({...state,loading:false, errors : action.payload})
    case USER_LOGIN_REQUEST:
        return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('isAuth', true);
        localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
        return {
              ...state,
              loading: false,
              token: action.payload.token,
              userInfo: action.payload.user,
              errors: null,
              isAuth: true,
            };
    case USER_LOGIN_FAIL:
        return { ...state, loading: false, errors: action.payload };
    case USER_LOGOUT :
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('isAuth')
        return { ...state, loading:false, errors: null, userInfo : {} , token : null, isAuth:false}
    default:
        return state
   } 
}

const listUsersState = {
    loading : false,
    users : [],
    admins : [],
    errors : null,
}

export const listUsersReducer = (state = listUsersState , action) => {
    switch (action.type) {
        case LIST_USERS_REQUEST:
            return({...state, loading:true})    
        case LIST_USERS_SUCCESS:{
            const arrUsers = []
            const arrAdmins = []
            for(var i =0 ; i<action.payload.length ; i++){
                action.payload[i].Role ==="User" ? arrUsers.push({value : action.payload[i]._id, label : action.payload[i].FirstName}) :
                arrAdmins.push({value : action.payload[i]._id, label : action.payload[i].FirstName})
            }
            return ({...state,loading:false,  users: arrUsers, admins : arrAdmins })
    }
        case LIST_USERS_FAIL:
            return ({...state,loading : false, errors : action.payload})
        default:
            return(state)
    }
}