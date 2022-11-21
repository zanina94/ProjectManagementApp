import { CREATE_PROJECT_FAIL, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, EDIT_PROJECT_FAIL, EDIT_PROJECT_REQUEST, EDIT_PROJECT_SUCCESS, LIST_PROJECTS_FAIL, LIST_PROJECTS_REQUEST, LIST_PROJECTS_SUCCESS } from "../Constants/projectConstants"



const listProjectsState = {
    loading : false,
    projects : [],
    projectsForDropDownList : [],
    errors : null,
}

export const listProjectsReducer = (state = listProjectsState , action) => {
    switch (action.type) {
        case LIST_PROJECTS_REQUEST:
            return({...state, loading:true})    
        case LIST_PROJECTS_SUCCESS:{
            const arr = []
            for(var i =0 ; i<action.payload.length ; i++){
                arr.push({value : action.payload[i]._id, label : action.payload[i].Title})
            }
            return ({...state,loading:false,projects:action.payload,projectsForDropDownList:arr})
        }
        case LIST_PROJECTS_FAIL:
            return ({...state,loading : false, errors : action.payload})
        default:
            return(state)
    }
}

const manageProjectState = {
    loading : false,
    project : {},
    errors : null,
    isSuccess : false
}

export const manageProjectReducer = (state = manageProjectState, action) =>{
    switch(action.type) {
        case CREATE_PROJECT_REQUEST: 
        return ({loading : true , project : {}})
        case CREATE_PROJECT_SUCCESS:
        return ({loading : false , project : action.payload, isSuccess : true})
        case CREATE_PROJECT_FAIL:
        return ({loading : false , errors : action.payload, isSuccess:false})
        case EDIT_PROJECT_REQUEST: 
        return ({loading : true , project : {}})
        case EDIT_PROJECT_SUCCESS:
        return ({loading : false , project : action.payload, isSuccess : true})
        case EDIT_PROJECT_FAIL:
        return ({loading : false , errors : action.payload, isSuccess:false})
        default:
            return state
    }
}