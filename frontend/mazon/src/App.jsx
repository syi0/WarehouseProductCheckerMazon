import { useState } from 'react'
import Login from './components/Login/Login.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AdminPanel from './components/AdminPanel/AdminPanel.jsx'
import WarehousemanPanel from './components/WarehousemanPanel/WarehousemanPanel.jsx'
import PrivateRoute from "./PrivateRoute.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/admin-panel"
                    element={
                        <PrivateRoute>
                            <AdminPanel />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/warehouseman-panel"
                    element={
                        <PrivateRoute>
                            <WarehousemanPanel />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
