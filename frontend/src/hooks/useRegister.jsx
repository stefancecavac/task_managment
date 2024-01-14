import { useState  } from "react"
import { useUserContext } from "./useUserContext"


export const UseRegister = () =>{
    const[error, setError] = useState(null)
    const[loading, setLoading] = useState(null)
    const{dispatch} = useUserContext()

    const register = async(email , password) => {

        const response = await fetch('http://localhost:4000/api/user/register' , {
            method: 'POST',
            body: JSON.stringify({email , password}),
            headers:{
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setLoading(false)
            setError(json.error)
        }
    
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
    
            dispatch({ type: 'LOGIN', payload: json })
            setLoading(false)
        }

    }
    return {register , error , loading}
}