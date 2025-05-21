import { useEffect, useState } from "react";
import axios from "axios";
import './productAdmin.css';

function ProductAdministration({ canEditPrice }) {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');
    const [columns, setColumns] = useState([]);
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({});
    const [editedProducts, setEditedProducts] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8081/tables').then(res => setTables(res.data));
    }, []);

    useEffect(() => {
        if (selectedTable) {
            axios.get(`http://localhost:8081/columns/${selectedTable}`).then(res => {
                setColumns(res.data);
                setNewProduct({});
                setEditedProducts({});
                fetchProducts();
            });
        }
    }, [selectedTable]);

    const fetchProducts = () => {
        axios.post('http://localhost:8081/all-products', { table: selectedTable }).then(res => {
            setProducts(res.data);
        });
    };

    const isValidNumber = (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 0;
    };

    const handleInputChange = (key, value) => {
        setNewProduct(prev => ({ ...prev, [key]: value }));
    };

    const handleAdd = () => {
        for (const col of columns) {
            if (!canEditPrice && col === 'cena') continue;

            const value = newProduct[col];
            const isNumberField = ['cena', 'stan_magazynowy', 'ilosc_minimalna'].includes(col);

            if (value === undefined || value === '' || value === null) {
                alert(`Pole "${col}" jest wymagane.`);
                return;
            }

            if (isNumberField && !isValidNumber(value)) {
                alert(`Pole "${col}" musi być liczbą większą lub równą 0.`);
                return;
            }
        }

        axios.post('http://localhost:8081/add-product', {
            table: selectedTable,
            data: newProduct
        }).then(() => {
            setNewProduct({});
            fetchProducts();
            alert("Produkt został dodany.");
        });
    };

    const handleEditChange = (id, key, value) => {
        setEditedProducts(prev => ({
            ...prev,
            [id]: {
                ...products.find(p => p.id === id),
                ...prev[id],
                [key]: value
            }
        }));
    };

    const handleSaveEdit = (id) => {
        const updated = editedProducts[id];
        if (!updated) return;

        for (const col of columns) {
            if (!canEditPrice && col === 'cena') continue;

            const value = updated[col];
            const isNumberField = ['cena', 'stan_magazynowy', 'ilosc_minimalna'].includes(col);

            if (value === undefined || value === '' || value === null) {
                alert(`Pole "${col}" jest wymagane.`);
                return;
            }

            if (isNumberField && !isValidNumber(value)) {
                alert(`Pole "${col}" musi być liczbą większą lub równą 0.`);
                return;
            }
        }

        axios.post('http://localhost:8081/edit-product', {
            table: selectedTable,
            id,
            updates: updated
        }).then(() => {
            setEditedProducts(prev => {
                const copy = { ...prev };
                delete copy[id];
                return copy;
            });
            fetchProducts();
            alert("Zmiany zostały zapisane.");
        });
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Czy na pewno chcesz usunąć ten produkt?");
        if (!confirmDelete) return;

        axios.post('http://localhost:8081/delete-product', {
            table: selectedTable,
            id
        }).then(() => {
            fetchProducts();
            alert("Produkt został usunięty.");
        });
    };

    return (
        <div className="productAdmin">
            <h2>Zarządzanie produktami</h2>

            <select value={selectedTable} onChange={e => setSelectedTable(e.target.value)}>
                <option value="">-- Wybierz tabelę --</option>
                {tables.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            {selectedTable && (
                <div className="addForm">
                    <h3>Dodaj nowy produkt</h3>
                    {columns.map(col => {
                        if (!canEditPrice && col === 'cena') return null;

                        return (
                            <input
                                key={col}
                                placeholder={col}
                                value={newProduct[col] || ''}
                                onChange={e => handleInputChange(col, e.target.value)}
                            />
                        );
                    })}
                    <button onClick={handleAdd} className="button">Dodaj</button>
                </div>
            )}

            <div className="productList">
                {products.map(product => (
                    <div className="productCard" key={product.id}>
                        {columns.map(col => {
                            if (!canEditPrice && col === 'cena') return null;

                            return (
                                <div key={col} className="field">
                                    <label>{col}:</label>
                                    <input
                                        value={
                                            editedProducts[product.id]?.[col] !== undefined
                                                ? editedProducts[product.id][col]
                                                : product[col] ?? ''
                                        }
                                        onChange={(e) => handleEditChange(product.id, col, e.target.value)}
                                    />
                                </div>
                            );
                        })}
                        <div className="actions">
                            <button onClick={() => handleSaveEdit(product.id)} className="saveBtn">Zapisz</button>
                            <button onClick={() => handleDelete(product.id)} className="deleteBtn">Usuń</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductAdministration;
