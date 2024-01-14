import {TaskContext} from '../context/taskContext'
import { useContext } from "react";

export const useTaskContext = () => {
    const context = useContext(TaskContext)

    if(!context){
        throw Error('useTaskContext must be used inside a tasksContextProwiver')
      }
  
      return context
}
