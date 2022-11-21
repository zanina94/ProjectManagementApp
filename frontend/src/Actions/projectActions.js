import axios from "axios"
import { CREATE_PROJECT_FAIL, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, EDIT_PROJECT_FAIL, EDIT_PROJECT_REQUEST, EDIT_PROJECT_SUCCESS, LIST_PROJECTS_FAIL, LIST_PROJECTS_REQUEST, LIST_PROJECTS_SUCCESS } from "../Constants/projectConstants"


//Get all projects
 export const listProjects =() => async(dispatch)=>{
    try {
        dispatch({type:LIST_PROJECTS_REQUEST})
        const {data} = await axios.get('/api/projects/getAllProjects')
        dispatch({ 
            type:LIST_PROJECTS_SUCCESS,
            payload : data})
    } catch (error) {
        dispatch({
            type:LIST_PROJECTS_FAIL,
            payload : error.response && error.response.data.message
            ? error.response.data.message : error.message })
    }  
}

//Add new project
export const addProject =(projectInfos,navigate) => async(dispatch)=>{
    try {
        dispatch({type:CREATE_PROJECT_REQUEST})
        const {data} = await axios.post('/api/projects/addProject',projectInfos)
        dispatch({ 
            type:CREATE_PROJECT_SUCCESS,
            payload : data})
            navigate('/')
    } catch (error) {
        dispatch({
            type:CREATE_PROJECT_FAIL,
            payload : error.response && error.response.data.message
            ? error.response.data.message : error.message })
    }  
}


//Close a project
export const closeProject=(id,isClosed) => async(dispatch) => {
    try {
        dispatch({type : EDIT_PROJECT_REQUEST})
        const {data} = await axios.put(`/api/projects/closeProject/${id}`,isClosed)
        dispatch({ 
            type:EDIT_PROJECT_SUCCESS,
            payload : data}) 
    } catch (error) {
        dispatch({
        type:EDIT_PROJECT_FAIL,
        payload:error.message ||error.response.data.errors.msg})
    }
}

//Edit a project
export const editProject=(id,projectInfos,navigate) => async(dispatch) => {
    try {
        dispatch({type : EDIT_PROJECT_REQUEST})
        const {data} = await axios.put(`/api/projects/editProject/${id}`,projectInfos)
        dispatch({ 
            type:EDIT_PROJECT_SUCCESS,
            payload : data}) 
            navigate('/')
            window.location.reload()
    } catch (error) {
        dispatch({
        type:EDIT_PROJECT_FAIL,
        payload:error.message ||error.response.data.errors.msg})
    }
}