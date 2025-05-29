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
    const [filterOptions, setFilterOptions] = useState({});
    const [advancedFilters, setAdvancedFilters] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/tables').then(res => setTables(res.data));
    }, []);

    useEffect(() => {
        if (selectedTable) {
            axios.get(`http://localhost:8081/columns/${selectedTable}`).then(res => {
                setColumns(res.data);
                setNewProduct({});
                setEditedProducts({});
                setAdvancedFilters({});
                setFilterOptions({});
                fetchProducts();
                fetchFilterOptions(res.data);
            });
        }
    }, [selectedTable]);

    const fetchProducts = () => {
        axios.post('http://localhost:8081/all-products', { table: selectedTable }).then(res => {
            setProducts(res.data);
        });
    };

    const fetchFilteredProducts = () => {
        axios.post('http://localhost:8081/filter-products', {
            table: selectedTable,
            filters: advancedFilters
        }).then(res => {
            setProducts(res.data);
        });
    };

    const fetchSearchResults = () => {
        if (!searchQuery) return;
        axios.post('http://localhost:8081/search-products', { query: searchQuery }).then(res => {
            setSearchResults(res.data);
        });
    };

    const fetchFilterOptions = async (cols) => {
        const excluded = ['cena', 'stan_magazynowy', 'stan_minimalny'];
        const options = {};
        for (const col of cols) {
            if (excluded.includes(col)) continue;
            try {
                const res = await axios.get(`http://localhost:8081/distinct-values/${selectedTable}/${col}`);
                options[col] = res.data;
            } catch {
                options[col] = [];
            }
        }
        setFilterOptions(options);
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
            const isNumberField = ['cena', 'stan_magazynowy', 'stan_minimalny'].includes(col);

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
            const isNumberField = ['cena', 'stan_magazynowy', 'stan_minimalny'].includes(col);

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

    const handleDelete = async (table, id) => {
        const username = localStorage.getItem('username'); 

        console.log("Kliknięto usuń:", table, id, username);

        const confirmed = window.confirm("Czy na pewno chcesz usunąć ten produkt?");
        if (!confirmed) return;

        try {
            const res = await fetch('http://localhost:8081/delete-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ table, id, username }),
            });

            const data = await res.json();
            console.log("Odpowiedź backendu:", data);

            if (data.success) {
                alert("Produkt został usunięty.");
                fetchProducts(); 
            } else {
                alert("Błąd usuwania: " + data.error);
            }
        } catch (err) {
            console.error("Błąd żądania:", err);
        }
    };


    const handleAdvancedFilterChange = (key, value) => {
        setAdvancedFilters(prev => ({ ...prev, [key]: value }));
    };

    const excludedFilterFields = ['cena', 'stan_magazynowy', 'stan_minimalny'];

    return (
        <div className="productAdmin">
            <h2>Wyszukaj produkty</h2>

            <div className="searchPanel">
                <input
                    type="text"
                    placeholder="Szukaj w całej bazie..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={fetchSearchResults}>Szukaj</button>
            </div>

            {searchResults.length > 0 && (
                <div className="searchResults">
                    <h3>Wyniki wyszukiwania:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Tabela</th>
                                {Object.keys(searchResults[0]).filter(col => col !== 'table').map(col => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.map((res, i) => (
                                <tr key={i}>
                                    <td>{res.table}</td>
                                    {Object.keys(res).filter(col => col !== 'table').map(col => (
                                        <td key={col}>{res[col]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <h2>Edycja produktów</h2>

            <select value={selectedTable} onChange={e => setSelectedTable(e.target.value)}>
                <option value="">-- Wybierz tabelę --</option>
                {tables.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            {selectedTable && (
                <div className="advancedFilter">
                    <h4>Filtruj produkty:</h4>
                    {columns.filter(col => !excludedFilterFields.includes(col)).map(col => (
                        <div key={col}>
                            <label>{col}:</label>
                            <select
                                value={advancedFilters[col] || ''}
                                onChange={(e) => handleAdvancedFilterChange(col, e.target.value)}
                            >
                                <option value="">-- Wszystko --</option>
                                {(filterOptions[col] || []).map((val, i) => (
                                    <option key={i} value={val}>{val}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <button onClick={fetchFilteredProducts}>Filtruj</button>
                </div>
            )}

            {selectedTable && (
                <div className="addForm">
                    <h3>Dodaj nowy produkt</h3>
                    {columns.map(col => {
                        if (!canEditPrice && col === 'cena') return null;
                        return (
                            <div key={col} className="formField">
                                <label>{col}</label>
                                <input
                                    placeholder={col}
                                    value={newProduct[col] || ''}
                                    onChange={e => handleInputChange(col, e.target.value)}
                                />
                            </div>
                        );
                    })}
                    <button onClick={handleAdd} className="button">Dodaj</button>
                </div>
            )}

            {selectedTable && (
                <div className="productList">
                    <h3>Produkty</h3>
                    <table>
                        <thead>
                            <tr>
                                {columns.map(col =>
                                    (!canEditPrice && col === 'cena') ? null : <th key={col}>{col}</th>
                                )}
                                <th>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    {columns.map(col => {
                                        if (!canEditPrice && col === 'cena') return null;
                                        return (
                                            <td key={col}>
                                                <input
                                                    value={
                                                        editedProducts[product.id]?.[col] !== undefined
                                                            ? editedProducts[product.id][col]
                                                            : product[col] ?? ''
                                                    }
                                                    onChange={(e) => handleEditChange(product.id, col, e.target.value)}
                                                />
                                            </td>
                                        );
                                    })}
                                    <td>
                                        <button onClick={() => handleSaveEdit(product.id)} className="saveBtn">Zapisz</button>
                                        <button onClick={() => handleDelete(selectedTable, product.id)} className="deleteBtn">Usuń</button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ProductAdministration;
