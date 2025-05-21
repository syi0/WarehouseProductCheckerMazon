import { useEffect, useState } from "react";
import axios from "axios";
import './productPanel.css'

function ProductManager({ showPrice }) {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');
    const [columns, setColumns] = useState([]);
    const [filters, setFilters] = useState({});
    const [options, setOptions] = useState({});
    const [product, setProduct] = useState(null);
    const [quantityChange, setQuantityChange] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8081/tables').then(res => setTables(res.data));
    }, []);

    useEffect(() => {
        if (selectedTable) {
            axios.get(`http://localhost:8081/columns/${selectedTable}`).then(res => {
                setColumns(res.data);
                setFilters({});
                setOptions({});
                setProduct(null);
            });
        }
    }, [selectedTable]);

    useEffect(() => {
        if (columns.length > 0) {
            const currentIndex = Object.keys(filters).length;
            if (currentIndex < columns.length) {
                const currentCol = columns[currentIndex];
                axios.post(`http://localhost:8081/values`, {
                table: selectedTable,
                column: currentCol,
                filters
            }).then(res => {
                setOptions(prev => ({ ...prev, [currentCol]: res.data }));
            });
            } else {
                fetchProduct();
            }
        }
    }, [filters, columns]);

    const handleFilterChange = (col, value) => {
        setFilters(prev => {
            const updated = { ...prev, [col]: value };
            const colIndex = columns.indexOf(col);
            columns.slice(colIndex + 1).forEach(c => {
                delete updated[c];
            });
            return updated;
        });
    };

    const fetchProduct = () => {
        axios.post('http://localhost:8081/product', {
            table: selectedTable,
            filters
        }).then(res => setProduct(res.data));
    };

    const updateQuantity = (delta) => {
    const newQuantity = product.stan_magazynowy + delta;

    if (newQuantity < 0) {
        alert("Nie można usunąć więcej niż wynosi stan magazynowy.");
        return;
    }

    axios.post('http://localhost:8081/update-quantity', {
        table: selectedTable,
        id: product.id,
        quantityChange: delta
    }).then(() => {
        setProduct(prev => ({
            ...prev,
            stan_magazynowy: newQuantity
        }));
        setQuantityChange(0);
    });
};


    const renderDynamicSelects = () => {
        const selects = [];
        for (let i = 0; i < columns.length; i++) {
            const col = columns[i];
            if (i > 0 && !filters[columns[i - 1]]) break; 
            selects.push(
                <div key={col}>
                    <label>{col}:</label>
                    <select
                        value={filters[col] || ""}
                        onChange={(e) => handleFilterChange(col, e.target.value)}>
                        <option value="">-- Wybierz --</option>
                        {(options[col] || []).map(value => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </select>
                </div>
            );
        }
        return selects;
    };

    return (
        <div className="productPanel">
            <h3>Wybierz produkt:</h3>
            <select value={selectedTable} onChange={e => setSelectedTable(e.target.value)}>
                <option value="">-- Wybierz tabelę --</option>
                {tables.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            {renderDynamicSelects()}

            {product && (
                <div style={{ marginTop: '10px', border: '1px solid #ccc', padding: '10px' }}>
                    <h4>Informacje o produkcie:</h4>
                    {Object.entries(product).map(([key, value]) => {
                        if (!showPrice && key === 'cena') return null;
                        return <p key={key}><strong>{key}:</strong> {value}</p>;
                    })}

                    <div>
                        <label>Zmień ilość: </label>
                        <input
                            type="number"
                            value={quantityChange}
                            onChange={e => setQuantityChange(parseInt(e.target.value) || 0)}
                            style={{ width: '100px', marginRight: '5px', fontSize: 'large' }}
                            min={0}
                        />
                        <button onClick={() => updateQuantity(quantityChange)} className="button">Dodaj</button>
                        <button onClick={() => updateQuantity(-quantityChange)} style={{ marginLeft: '10px' }} className="button">Usuń</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductManager;
