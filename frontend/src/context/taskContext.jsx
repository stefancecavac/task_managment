import { createContext, useReducer } from "react";


export const TaskContext = createContext()


export const TaskReducer = (state, action) => {

    switch (action.type) {
        case "SET_TASKS":
            return {
                tasks: action.payload
            }
        case "CREATE_TASKS":
            return {
                tasks: [action.payload, ...state.tasks]
            }

        case "DELETE_TASKS":
            return {
                tasks: state.tasks.filter((w) => w._id !== action.payload._id)
            }
            case 'UPDATE_TASK':
                return {
                  tasks: state.tasks.map((w) => (w._id === action.payload._id ? action.payload : w))
                }

        default:
            return state
    }
}


export const TaskContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(TaskReducer, {
        tasks: null
    })

    return (
        <TaskContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TaskContext.Provider>
    )
}