import { useEffect } from "react"

import TaskCard from "../components/taskCard"
import MyCalendar from "../components/calendar"

import { useTaskContext } from "../hooks/useTaskContext"
import { useUserContext } from "../hooks/useUserContext"

const Home = () => {
    const { tasks, dispatch } = useTaskContext()
    const { user } = useUserContext()

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



    return (
        <div className="home">
            <div className="home-main">
                <h1>My tasks:</h1>
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
    )
}

export default Home