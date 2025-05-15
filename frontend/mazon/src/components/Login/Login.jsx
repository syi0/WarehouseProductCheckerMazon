import './Login.css'
import logo from './mazonLogo.png'
import { useState } from 'react'
import Validation from './Validation'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Login() {
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate()

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        if (!validationErrors.username && !validationErrors.password) {
            axios.post('http://localhost:8081/', values)
                .then(res => {
                    console.log(res.data);
                    if (res.data.status === "Success") {
                        localStorage.setItem("isLoggedIn", "true");
                        localStorage.setItem("rola", res.data.rola || "warehouseman");

                        if (res.data.rola === "admin") {
                            navigate("/admin-panel");
                        } else {
                            navigate("/warehouseman-panel");
                        }
                    }
                })
                .catch(err => {
                    console.error("Login failed", err);
                });
        }
    }




    return (
        <section className="form">
            <img src={logo} alt="Mazon-Logo" className="mazonLogo" />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Login"
                    value={values.username}
                    onChange={handleInput}
                    required
                /> <br />
                {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
                <input
                    type="password"
                    name="password"
                    placeholder="Hasło"
                    value={values.password}
                    onChange={handleInput}
                    required
                /> <br />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                <button type="submit">Login</button>
            </form>
        </section>
    )
}

export default Login
