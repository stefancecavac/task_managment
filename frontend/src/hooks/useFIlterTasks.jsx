

import { useTaskContext } from "./useTaskContext"
import { useUserContext } from "./useUserContext"


export const UseFilterTasks = () =>{

    const{dispatch} = useTaskContext()
    const{user} = useUserContext()

    
        const getPendingTasks = async() => {
    
            const response = await fetch('http://localhost:4000/api/tasks/pending' , {
                
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
    
            const json = await response.json()
    
            if(response.ok){
                dispatch({ type: 'SET_TASKS', payload: json })
            }
        }

        const getCompletedTasks = async() => {

            const response = await fetch('http://localhost:4000/api/tasks/completed' , {
                
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
    
            const json = await response.json()
    
            if(response.ok){
                dispatch({ type: 'SET_TASKS', payload: json })
            }
        }
    
        const getFailedTasks = async() => {

            const response = await fetch('http://localhost:4000/api/tasks/failed' , {
                
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
    
            const json = await response.json()
    
            if(response.ok){
                dispatch({ type: 'SET_TASKS', payload: json })
            }
        }

        
        return{getPendingTasks ,getCompletedTasks, getFailedTasks}

    
    
}

