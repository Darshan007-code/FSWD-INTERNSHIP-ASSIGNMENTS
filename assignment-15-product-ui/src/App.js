import React, { useState } from "react";

const productsData = [
  { id: 1, name: "Running Shoes", price: 2000, category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
  { id: 2, name: "T-Shirt", price: 800, category: "Fashion", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" },
  { id: 3, name: "Jeans", price: 1500, category: "Fashion", image: "https://images.unsplash.com/photo-1514996937319-344454492b37" },
  { id: 4, name: "Laptop", price: 50000, category: "Electronics", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
  { id: 5, name: "Headphones", price: 1500, category: "Electronics", image: "https://images.unsplash.com/photo-1518444028785-8f3f1b3b0cfc" },
  { id: 6, name: "Smart Watch", price: 3000, category: "Electronics", image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b" },
  { id: 7, name: "Backpack", price: 1200, category: "Fashion", image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb" },
  { id: 8, name: "Sneakers", price: 2500, category: "Fashion", image: "https://images.unsplash.com/photo-1528701800489-20be3c8c1f56" }
];

function App() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [cart, setCart] = useState(0);

  let filteredProducts = productsData
    .filter((p) => (category === "All" ? true : p.category === category))
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2>🛍️ Darshan Store</h2>

        <div style={styles.cart}>
          🛒 <span>{cart}</span>
        </div>
      </div>

      {/* CONTROLS */}
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select onChange={(e) => setCategory(e.target.value)} style={styles.select}>
          <option value="All">All</option>
          <option value="Fashion">Fashion</option>
          <option value="Electronics">Electronics</option>
        </select>

        <select onChange={(e) => setSort(e.target.value)} style={styles.select}>
          <option value="">Sort</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      {/* PRODUCTS */}
      <div style={styles.grid}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt="" style={styles.image} />

            <h3>{product.name}</h3>
            <p style={styles.price}>₹ {product.price}</p>

            <button onClick={() => setCart(cart + 1)} style={styles.cartBtn}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Segoe UI",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
    minHeight: "100vh",
    padding: "20px",
    color: "white"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  cart: {
    background: "#22c55e",
    padding: "8px 15px",
    borderRadius: "20px",
    fontWeight: "bold"
  },
  controls: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px"
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none"
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "none"
  },
  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  card: {
    width: "220px",
    background: "white",
    color: "black",
    borderRadius: "15px",
    padding: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
    transition: "0.3s"
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px"
  },
  price: {
    color: "#2563eb",
    fontWeight: "bold"
  },
  cartBtn: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer"
  }
};

export default App;