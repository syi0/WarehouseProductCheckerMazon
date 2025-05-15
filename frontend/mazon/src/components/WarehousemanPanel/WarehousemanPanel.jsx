import { useNavigate } from "react-router-dom";
import './WarehousemanPanel.css'

function WarehousemanPanel() {
    const navigate = useNavigate(); 

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("rola");
        navigate("/"); 
    };

    return (
        <>
        <section className="panel">
            <h1 className="tittle">Panel Magazyniera</h1> <br /> <br />
            <button onClick={handleLogout}>Wyloguj się</button>
        </section>
            
        </>
    );
}

export default WarehousemanPanel;
