import { useNavigate } from "react-router-dom"; 
import ProductPanel from "../ProductPanel/ProductPanel";
import './AdminPanel.css'

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
            <h1 className="tittle">Panel Administratora</h1> <br />
            <ProductPanel showPrice={true}/> <br />
            <button onClick={handleLogout} className="logout-button">Wyloguj się</button>
        </section>
            
        </>
    );
}

export default AdminPanel;
