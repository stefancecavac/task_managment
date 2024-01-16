import { useEffect } from "react"

import TaskCard from "../components/taskCard"
import MyCalendar from "../components/calendar"

import { useTaskContext } from "../hooks/useTaskContext"
import { useUserContext } from "../hooks/useUserContext"
import { UseFilterTasks } from "../hooks/useFIlterTasks"

const Home = () => {
    const { tasks, dispatch } = useTaskContext()
    const { user } = useUserContext()
    const { getPendingTasks, getCompletedTasks, getFailedTasks } = UseFilterTasks()

    useEffect(() => {

        const fetchTask = async () => {

            const response = await fetch('http://localhost:4000/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_TASKS', payload: json })
            }

        }

        fetchTask()
    }, [dispatch, user])


    
    const filterPending = async () => {
        await getPendingTasks()
    }

    const filterCompleted = async () => {
        await getCompletedTasks()
    }

    const filterFailed = async () => {
        await getFailedTasks()
    }


    return (
        <div className="home-header">

            <div className="home">

                <div className="home-main">

                    <h1>My tasks:</h1>
                    <div className="buttons">

                        <button onClick={filterPending}>filter by pending</button>
                        <button  onClick={filterCompleted}>filter by completed</button>
                        <button onClick={filterFailed}>filter by failed</button>

                    </div>
                    <div className="content">

                        {tasks && tasks.map((task) => (
                            <TaskCard key={task._id} task={task}></TaskCard>
                        ))}
                    </div>
                </div>

                <div className="home-calendar">
                    <MyCalendar ></MyCalendar>
                </div>
            </div>
        </div>
    )
}

export default Home