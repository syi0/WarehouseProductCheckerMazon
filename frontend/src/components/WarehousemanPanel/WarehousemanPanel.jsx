import { useNavigate } from "react-router-dom";
import './WarehousemanPanel.css'
import ProductPanel from "../ProductPanel/ProductPanel";

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
            <h1 className="tittle">Panel Magazyniera</h1> <br /> 
            <ProductPanel showPrice={false}/>
            <button onClick={handleLogout}  className="logout-button">Wyloguj się</button>
        </section>
            
        </>
    );
}

export default WarehousemanPanel;
