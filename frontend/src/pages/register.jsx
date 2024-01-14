import{ useState } from "react"
import { Link } from "react-router-dom"
import { UseRegister } from "../hooks/useRegister"


const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {register, error , loading} = UseRegister()

    const handleRegister = async(e) => {
        e.preventDefault()

        await register(email , password)
    }

    return (

        <div className="register">
            <form name="registerForm" onSubmit={(handleRegister)}>
                <h1>Register:</h1>
                <label >Email:</label>
                <input type='text'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}></input>

                <label>password:</label>
                <input type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}></input>

                <button disabled={loading} type="submit">Register</button>

                <Link to='/login'>login</Link>

                {error && <div className="error">{error}</div>}
                
            </form>
        </div>
    )
}

export default Register