import{ useState } from "react"
import {UseLogin} from '../hooks/useLogin'
import { Link } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error , loading} = UseLogin()
    
    const handleLogin = async(e) => {
        e.preventDefault()
       
        await login(email , password)
    }

    return (

        <div className="login">
            <form name="loginForm" onSubmit={(handleLogin)}>
                <h1>Login:</h1>
                <label>Email:</label>
                <input type='text'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}></input>

                <label>password:</label>
                <input type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}></input>

                <button disabled={loading} type="submit">Login</button>

                <Link to='/register'>register</Link>
                
                {error && <div className="error">{error}</div>}

            </form>
        </div>
    )
}

export default Login