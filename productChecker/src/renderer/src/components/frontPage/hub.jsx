import "./hub.css"
import logo from "../../assets/mazonLogo.png"

function Hub() {
    return(
        <>
            <img src={logo} alt="Mazon-Logo" className="mazonLogo" /> <br />
            <button><a href="">Panel Administratora</a></button>
            <button><a href="">Panel Menadżera</a></button>
        </>
    )
} export default Hub