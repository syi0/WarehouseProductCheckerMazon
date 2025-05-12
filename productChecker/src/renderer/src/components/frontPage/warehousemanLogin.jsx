import './form.css'
import logo from "../../assets/mazonLogo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function WarehousemanLogin() {
    return(
        <>
        <section className="form">
            <img src={logo} alt="Mazon-Logo" className="mazonLogo" /> <br />
                <h2>Menadżer</h2>
                <form action="">
                    <input type="text" placeholder="Login"/> <br />
                    <input type="password" name="" id="" placeholder="Hasło"/> <br />
                    <button type="submit">Zaloguj się</button>
                </form>
                <a className="backLink" href="/"><FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Wróć na stronę główną</a>
        </section>
        
        </>
    )
} export default WarehousemanLogin