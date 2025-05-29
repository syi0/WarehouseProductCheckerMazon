import React, { useEffect, useState } from "react";
import axios from "axios";

const LowStockAlert = () => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8081/low-stock")
      .then((res) => setLowStockItems(res.data))
      .catch((err) => {
        console.error("Błąd ładowania danych:", err);
        setError("Nie udało się załadować danych.");
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Produkty z niskim stanem magazynowym</h2>

      {error && <p style={styles.error}>{error}</p>}

      {lowStockItems.length === 0 ? (
        <p style={styles.message}>Brak produktów poniżej stanu minimalnego.</p>
      ) : (
        <div style={styles.cardContainer}>
          {lowStockItems.map((item, index) => (
            <div key={index} style={styles.card}>
              <div><strong>Nazwa:</strong> {item.opis}</div>
              <div><strong>Stan:</strong> {item.stan_magazynowy}</div>
              <div><strong>Minimalna ilość:</strong> {item.stan_minimalny}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
  },
  header: {
    color: "#d42121",
    fontSize: "20px",
    marginBottom: "15px",
  },
  message: {
    color: "#555",
  },
  error: {
    color: "#d42121",
    fontSize: "14px",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
  },
  card: {
    backgroundColor: "#f9f9f9",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "12px",
    minWidth: "220px",
    flex: "1 1 220px",
    boxShadow: "1px 1px 5px rgba(0,0,0,0.1)",
  }
};

export default LowStockAlert;
