import { useTaskContext } from "../hooks/useTaskContext";
import { useUserContext } from "../hooks/useUserContext";


 
const TaskCard = ({task}) => {
    const {user} = useUserContext()
    const {dispatch} = useTaskContext()

    const handleUpdate = async (updatedStatus) => {

        if (!user) {
          return;
        }
    
        const response = await fetch('http://localhost:4000/api/tasks/' + task._id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify({ task_status: updatedStatus }),
        });
    
        const json = await response.json();
    
        if (response.ok) {
          dispatch({ type: 'UPDATE_TASK', payload: json });
        }
      }
      
      const handleComplete = async() => {
        handleUpdate('completed')
      }
    
     
    return(

        <div className="taskcard">
            <h2>{task.title}</h2>
            <p>start date: {new Date(task.start_date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>end date: {new Date(task.end_date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

           <p>status: {task.task_status}</p>
        <button onClick={handleComplete}>Complete</button>
        
        </div>
    )
}

export default TaskCard