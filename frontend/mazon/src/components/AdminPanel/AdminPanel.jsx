import { useNavigate } from "react-router-dom"; 
import ProductPanel from "../ProductPanel/ProductPanel";
import './AdminPanel.css'
import LowStockAlert from "../LowStockAlert/LowStockAlert";
import ProductAdministration from "../ProductAdministration/ProductAdministration";

function AdminPanel() {
    const navigate = useNavigate(); 

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("rola");
        navigate("/"); 
    };

    return (
        <>
        <section className="panel">
            <h1 className="header">Panel Administratora</h1>
            <ProductAdministration canEditPrice={true}/>
            <LowStockAlert/> <br />
            
            <button onClick={handleLogout} className="button" id="logout-button">Wyloguj się</button>
        </section>
            
        </>
    );
}

export default AdminPanel;
