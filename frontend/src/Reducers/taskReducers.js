import { CREATE_TASK_FAIL,
         CREATE_TASK_REQUEST, 
         CREATE_TASK_SUCCESS, 
         DELETE_TASK_FAIL, 
         DELETE_TASK_REQUEST, 
         DELETE_TASK_SUCCESS, 
         EDIT_TASK_FAIL, 
         EDIT_TASK_REQUEST, 
         EDIT_TASK_SUCCESS, 
         LIST_TASKS_FAIL, 
         LIST_TASKS_REQUEST, 
         LIST_TASKS_SUCCESS } from "../Constants/taskConstants"


const listTasksState = {
    loading : false,
    tasks : [],
    tasksForDropDownList : [],
    errors : null,
}

export const listTasksReducer = (state = listTasksState , action) => {
    switch (action.type) {
        case LIST_TASKS_REQUEST:
            return({...state, loading:true})    
        case LIST_TASKS_SUCCESS:{
            const arr = []
            for(var i =0 ; i<action.payload.length ; i++){
                arr.push({value : action.payload[i]._id, label : action.payload[i].Title})
            }
            return ({...state,loading:false,tasks:action.payload,tasksForDropDownList:arr})
        }
        case LIST_TASKS_FAIL:
            return ({...state,loading : false, errors : action.payload})
        default:
            return(state)
    }
}

const manageTaskState = {
    loading : false,
    task : {},
    errors : null,
    isSuccess : false
}

export const manageTaskReducer = (state = manageTaskState, action) =>{
    switch(action.type) {
        case CREATE_TASK_REQUEST: 
        return ({loading : true , task : {}})
        case CREATE_TASK_SUCCESS:
        return ({loading : false , task : action.payload, isSuccess : true})
        case CREATE_TASK_FAIL:
        return ({loading : false , errors : action.payload, isSuccess:false})
        case EDIT_TASK_REQUEST: 
        return ({loading : true , task : {}})
        case EDIT_TASK_SUCCESS:
        return ({loading : false , task : action.payload, isSuccess : true})
        case EDIT_TASK_FAIL:
        return ({loading : false , errors : action.payload, isSuccess:false})
        case DELETE_TASK_REQUEST: 
        return ({loading : true , task : {}})
        case DELETE_TASK_SUCCESS:
        return ({loading : false , task : {}, isSuccess : true})
        case DELETE_TASK_FAIL:
        return ({loading : false , errors : action.payload, isSuccess:false})
        default:
            return state
    }
}