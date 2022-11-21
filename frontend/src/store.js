import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {listUsersReducer, authUserReducer } from './Reducers/userReducers'
import { listProjectsReducer, manageProjectReducer } from './Reducers/projectReducers'
import { listTasksReducer, manageTaskReducer } from './Reducers/taskReducers'
import { listHistoriesReducer } from './Reducers/historyReducers'

const reducer = combineReducers({
    authUser : authUserReducer,
    listUsers : listUsersReducer,
    manageProject : manageProjectReducer,
    listProjects : listProjectsReducer,
    manageTask : manageTaskReducer,
    listTasks : listTasksReducer,
    listHistories : listHistoriesReducer
})
const initialState = {}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store