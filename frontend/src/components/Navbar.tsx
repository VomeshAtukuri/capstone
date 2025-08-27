import { Link } from "react-router-dom";

export default function Navbar() {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding: "12px 24px",
      backgroundColor: "#1e3a8a", // deep blue
      color: "white",
      position: "sticky" as const,
      top: 0,
      zIndex: 1000,
    },
    logo: {
      fontSize: "22px",
      fontWeight: "bold",
      letterSpacing: "1px",
      cursor: "pointer",
    },
    navLinks: {
      display: "flex",
      gap: "24px",
      fontSize: "16px",
    },
    navLink: {
      textDecoration: "none",
      color: "white",
      transition: "color 0.3s",
    },
    authButtons: {
      display: "flex",
      gap: "16px",
    },
    authLink: {
      textDecoration: "none",
      color: "white",
      fontWeight: "500",
      padding: "6px 12px",
      border: "1px solid white",
      borderRadius: "6px",
      transition: "all 0.3s",
    },
  };

  return (
    <div style={styles.container}>
      {/* Logo */}
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <p style={styles.logo}>OneStop</p>
      </Link>

      {/* Middle Navigation */}
      <div style={styles.navLinks}>
        <a href="#home" style={styles.navLink}>
          Home
        </a>
        <a href="#about" style={styles.navLink}>
          About
        </a>
        <a href="#services" style={styles.navLink}>
          Services
        </a>
        <a href="#contact" style={styles.navLink}>
          Contact
        </a>
      </div>

      {/* Right Auth Buttons */}
      <div style={styles.authButtons}>
        <Link to="/login" style={styles.authLink}>
          Login
        </Link>
        <Link to="/register" style={styles.authLink}>
          Register
        </Link>
      </div>
    </div>
  );
}
