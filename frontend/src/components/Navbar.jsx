import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "20px", background: "#222" }}>
      <Link to="/" style={linkStyle}>Dashboard</Link>
      <Link to="/products" style={linkStyle}>Products</Link>
      <Link to="/categories" style={linkStyle}>Categories</Link>
      <Link to="/suppliers" style={linkStyle}>Suppliers</Link>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  marginRight: "20px",
  textDecoration: "none",
};

export default Navbar;