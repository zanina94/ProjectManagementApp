import axios from "axios"
import { LIST_HISTORIES_FAIL, LIST_HISTORIES_REQUEST, LIST_HISTORIES_SUCCESS } from "../Constants/historyConstants"


//Get all histories
export const getAllHistories =() => async(dispatch)=>{
    try {
        dispatch({type:LIST_HISTORIES_REQUEST})
        const {data} = await axios.get('/api/histories/getAllHistories')
        dispatch({ 
            type:LIST_HISTORIES_SUCCESS,
            payload : data})
    } catch (error) {
        dispatch({
            type:LIST_HISTORIES_FAIL,
            payload : error.response && error.response.data.message
            ? error.response.data.message : error.message })
    }  
}