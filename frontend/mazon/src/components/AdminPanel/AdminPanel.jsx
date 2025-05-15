import { useNavigate } from "react-router-dom"; 

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
            <h1 className="tittle">Panel Administratora</h1>
            <button onClick={handleLogout}>Wyloguj się</button>
        </section>
            
        </>
    );
}

export default AdminPanel;
