import { UserContext } from '../context/userContext'
import { useContext } from 'react'

export const useUserContext = () => {
    const context = useContext(UserContext)

    if(!context){
      throw Error('useUSerContext must be used inside a userContextProvider')
    }

    return context
}