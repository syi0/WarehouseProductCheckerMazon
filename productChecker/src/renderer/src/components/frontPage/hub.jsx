import "./hub.css"
import logo from "../../assets/mazonLogo.png"

function Hub() {
    return(
        <>
            <img src={logo} alt="Mazon-Logo" className="mazonLogo" /> <br />
            <a href="/admin-login"><button>Panel Administratora</button></a>
            <a href="/warehouseman-login"><button>Panel Menadżera</button></a>
        </>
    )
} export default Hub