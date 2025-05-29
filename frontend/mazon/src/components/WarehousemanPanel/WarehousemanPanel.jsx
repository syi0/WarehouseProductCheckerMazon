import { useNavigate } from "react-router-dom";
import './WarehousemanPanel.css'
import ProductPanel from "../ProductPanel/ProductPanel";
import LowStockAlert from "../LowStockAlert/LowStockAlert";
import ProductAdministration from "../ProductAdministration/ProductAdministration";

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
            <h1 className="header">Panel Magazyniera</h1> <br /> 
            <ProductAdministration canEditPrice={false}/>
            <LowStockAlert/> <br />
            <button onClick={handleLogout} id="logout-button"  className="button">Wyloguj się</button>
        </section>
            
        </>
    );
}

export default WarehousemanPanel;
