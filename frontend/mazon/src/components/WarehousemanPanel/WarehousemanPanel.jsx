import { useNavigate } from "react-router-dom";
import './WarehousemanPanel.css'
import ProductPanel from "../ProductPanel/ProductPanel";
import LowStockAlert from "../LowStockAlert/LowStockAlert";

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
            <ProductPanel showPrice={false}/>
            <LowStockAlert/> <br />
            <button onClick={handleLogout}  className="logout-button">Wyloguj się</button>
        </section>
            
        </>
    );
}

export default WarehousemanPanel;
