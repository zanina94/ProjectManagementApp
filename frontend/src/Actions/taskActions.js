import axios from "axios"
import { CREATE_TASK_FAIL, CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, DELETE_TASK_FAIL, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, EDIT_TASK_FAIL, EDIT_TASK_REQUEST, EDIT_TASK_SUCCESS, LIST_TASKS_FAIL, LIST_TASKS_REQUEST, LIST_TASKS_SUCCESS } from "../Constants/taskConstants"


//Get all tasks
export const listTasks =() => async(dispatch)=>{
    try {
        dispatch({type:LIST_TASKS_REQUEST})
        const {data} = await axios.get('/api/tasks/getAllTasks')
        dispatch({ 
            type:LIST_TASKS_SUCCESS,
            payload : data})
    } catch (error) {
        dispatch({
            type:LIST_TASKS_FAIL,
            payload : error.response && error.response.data.message
            ? error.response.data.message : error.message })
    }  
}

//Add new task
export const addTask =(tasksInfos,navigate) => async(dispatch)=>{
    try {
        dispatch({type:CREATE_TASK_REQUEST})
        const {data} = await axios.post('/api/tasks/addTask',tasksInfos)
        dispatch({ 
            type:CREATE_TASK_SUCCESS,
            payload : data})
            navigate('/Tasks')
    } catch (error) {
        dispatch({
            type:CREATE_TASK_FAIL,
            payload : error.response && error.response.data.message
            ? error.response.data.message : error.message })
    }  
}

//Edit existing Task
export const editTask=(id,taskInfos,navigate) => async(dispatch) => {
    try {
        dispatch({type : EDIT_TASK_REQUEST})
        const {data} = await axios.put(`/api/tasks/editTask/${id}`,taskInfos)
        dispatch({ 
            type:EDIT_TASK_SUCCESS,
            payload : data}) 
            navigate('/Tasks')
            window.location.reload()
           
    } catch (error) {
        dispatch({
        type:EDIT_TASK_FAIL,
        payload:error.message ||error.response.data.errors.msg})
    }
}

//Delete existing Task
export const deleteTask=(id,navigate) => async(dispatch) => {
    try {
        dispatch({type : DELETE_TASK_REQUEST})
        const {data} = await axios.delete(`/api/tasks/deleteTask/${id}`)
        dispatch({ 
            type:DELETE_TASK_SUCCESS,
            payload : data}) 
            window.location.reload()    
    } catch (error) {
        dispatch({
        type:DELETE_TASK_FAIL,
        payload:error.message ||error.response.data.errors.msg})
    }
}