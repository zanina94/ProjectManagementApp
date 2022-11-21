import { LIST_HISTORIES_FAIL, LIST_HISTORIES_REQUEST, LIST_HISTORIES_SUCCESS } from "../Constants/historyConstants"


const listHistoriesState = {
    loading : false,
    histories : [],
    errors : null,
}

export const listHistoriesReducer = (state = listHistoriesState , action) => {
    switch (action.type) {
        case LIST_HISTORIES_REQUEST:
            return({...state, loading:true})    
        case LIST_HISTORIES_SUCCESS:{
            return ({...state, loading:false ,  histories: action.payload})
    }
        case LIST_HISTORIES_FAIL:
            return ({...state,loading : false, errors : action.payload})
        default:
            return(state)
    }
}