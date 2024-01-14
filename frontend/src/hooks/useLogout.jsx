import { useTaskContext } from "./useTaskContext"
import { useUserContext } from "./useUserContext"




export const useLogout = () => {
    const {dispatch} = useUserContext()
    const {dispatch: serviceDispatch} = useTaskContext()

    const logout = async() => {

        localStorage.removeItem('user')

        dispatch({type:'LOGOUT'})
        serviceDispatch({type: 'SET_TASKS' , payload: null})

    }
    return {logout}
}