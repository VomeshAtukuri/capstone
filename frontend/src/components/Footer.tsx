export default function Footer() {
  const styles = {
    container: {
      width: "100%",
      backgroundColor: "#333333", // matches secondary color
      color: "white",
      padding: "20px 24px",
      marginTop: "auto",
    },
    inner: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap" as const,
      maxWidth: "1200px",
      margin: "0 auto",
    },
    left: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "4px",
    },
    logo: {
      fontSize: "20px",
      fontWeight: "bold",
      margin: 0,
    },
    text: {
      fontSize: "14px",
      color: "#cccccc",
      margin: 0,
    },
    links: {
      display: "flex",
      gap: "20px",
      fontSize: "14px",
    },
    link: {
      textDecoration: "none",
      color: "white",
      transition: "color 0.3s",
    },
    social: {
      display: "flex",
      gap: "16px",
      fontSize: "18px",
    },
    socialLink: {
      textDecoration: "none",
      color: "white",
      transition: "color 0.3s",
    },
  };

  return (
    <footer style={styles.container}>
      <div style={styles.inner}>
        {/* Left Section */}
        <div style={styles.left}>
          <h3 style={styles.logo}>OneStop</h3>
          <p style={styles.text}>
            © {new Date().getFullYear()} OneStop. All rights reserved.
          </p>
        </div>

        {/* Middle Section */}
        <div style={styles.links}>
          <a href="#home" style={styles.link}>Home</a>
          <a href="#about" style={styles.link}>About</a>
          <a href="#contact" style={styles.link}>Contact</a>
          <a href="#privacy" style={styles.link}>Privacy Policy</a>
        </div>

        {/* Right Section */}
        <div style={styles.social}>
          <a href="https://facebook.com" style={styles.socialLink}>🌐</a>
          <a href="https://twitter.com" style={styles.socialLink}>🐦</a>
          <a href="https://instagram.com" style={styles.socialLink}>📸</a>
        </div>
      </div>
    </footer>
  );
}
