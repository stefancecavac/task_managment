import {useTaskContext} from '../hooks/useTaskContext'
import { useUserContext } from '../hooks/useUserContext'

const TaskCard = ({task}) => {
const {dispatch} = useTaskContext()
const {user} = useUserContext()

    const submit = async() => {
        const response = await fetch('http://localhost:4000/api/tasks/'+task._id, {

            method: 'DELETE', 
            headers: {
                'Authorization' : `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type: 'DELETE_TASKS', payload: json })
          
        }

    }

    return(

        <div className="taskcard">
            <h2>{task.title}</h2>
            <p>{task.date}</p>
           
        <span onClick={submit}>delete</span>
        </div>
    )
}

export default TaskCard