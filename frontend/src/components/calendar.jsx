import {Calendar} from 'react-calendar'
import {timeline} from 'react-calendar-timeline'
import { useTaskContext } from '../hooks/useTaskContext'

const MyCalendar = () => {
    const {tasks} = useTaskContext()

    return(
        <div className='calendar'>
        <h2>Calendar</h2>
        <Calendar/>

        {tasks && tasks.map((task) => (
            <p key={task._id}>{task.title}</p>
        ))}
      </div>
    )
}

export default MyCalendar