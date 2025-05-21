import './Login.css'
import logo from './mazonLogo.png'
import logoError from './mazonLogo-error.png'
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

    const [loginError, setLoginError] = useState('');


    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
        setLoginError('');
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
                    if (err.response && err.response.status === 401) {
                        setLoginError("Nieprawidłowy login lub hasło");
                    } else {
                        setLoginError("Błąd połączenia z serwerem");
                    }
                    console.error("Login failed", err);
                });
        }
    }




    return (
        <section className="form">
            <img src={loginError ? logoError : logo} alt="Mazon-Logo" className="mazonLogo" />
            {loginError && <p style={{ color: '#d42121' }}>{loginError}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Login"
                    value={values.username}
                    onChange={handleInput}
                    required
                    className={errors.username || loginError ? "input-error" : ""}
                /> <br />
                {errors.username && <p style={{ color: '#d42121' }}>{errors.username}</p>}
                <input
                    type="password"
                    name="password"
                    placeholder="Hasło"
                    value={values.password}
                    onChange={handleInput}
                    required
                    className={errors.password || loginError ? "input-error" : ""}
                /> <br />
                <span>{errors.password && <p style={{ color: '#d42121' }}>{errors.password}</p>}</span>
                <button type="submit" className={loginError ? "button-error" : ""}>Zaloguj</button>
            </form>
        </section>
    )
}

export default Login
