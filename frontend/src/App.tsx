import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function App() {
  const styles = {
    container: {
      padding: "40px 24px",
      maxWidth: "1200px",
      margin: "0 auto",
      color: "#1d1d1d",
    },
    section: {
      marginBottom: "60px",
    },
    heading: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "16px",
    },
    text: {
      fontSize: "16px",
      lineHeight: "1.6",
      maxWidth: "800px",
    },
    list: {
      listStyle: "disc",
      marginTop: "12px",
      marginLeft: "24px",
      fontSize: "16px",
      lineHeight: "1.6",
    },
    servicesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    serviceCard: {
      backgroundColor: "#f4f4f4",
      padding: "20px",
      borderRadius: "8px",
      textAlign: "center" as const,
    },
    contactBox: {
      backgroundColor: "#f4f4f4",
      padding: "20px",
      borderRadius: "8px",
      maxWidth: "600px",
    },
    contactHeading: {
      fontSize: "22px",
      fontWeight: "600",
      marginBottom: "12px",
    },
    contactItem: {
      marginBottom: "8px",
      fontSize: "15px",
    },
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <section id="home" style={styles.section}>
          <h2 style={styles.heading}>Welcome to OneStop</h2>
          <p style={styles.text}>
            OneStop is your one-stop solution for everything you need. We aim to
            bring you the best services and products with a seamless experience.
            Explore our platform and discover all that we have to offer.
          </p>
        </section>

        <section id="about" style={styles.section}>
          <h2 style={styles.heading}>About Us</h2>
          <p style={styles.text}>
            At OneStop, we believe in simplicity, convenience, and trust. Our
            mission is to make your life easier by providing everything in one
            place. From shopping to services, we are here to serve you better
            each day.
          </p>

          <ul style={styles.list}>
            <li>Founded in 2024 with a vision to simplify daily needs</li>
            <li>Trusted by 10,000+ happy customers worldwide</li>
            <li>Dedicated to quality, affordability, and reliability</li>
            <li>Customer support available 24/7</li>
          </ul>
        </section>

        <section id="services" style={styles.section}>
          <h2 style={styles.heading}>Our Services</h2>
          <div style={styles.servicesGrid}>
            <div style={styles.serviceCard}>
              <h3>🛒 Shopping</h3>
              <p>
                Explore a wide range of products across multiple categories at
                the best prices.
              </p>
            </div>
            <div style={styles.serviceCard}>
              <h3>⚡ Fast Delivery</h3>
              <p>
                Get your orders delivered quickly and reliably, right at your
                doorstep.
              </p>
            </div>
            <div style={styles.serviceCard}>
              <h3>💳 Secure Payments</h3>
              <p>
                Pay with confidence using our trusted and secure payment
                gateways.
              </p>
            </div>
            <div style={styles.serviceCard}>
              <h3>📞 24/7 Support</h3>
              <p>
                Our dedicated team is always ready to help you whenever you need
                us.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" style={styles.section}>
          <div style={styles.contactBox}>
            <h3 style={styles.contactHeading}>Contact Us</h3>
            <p style={styles.contactItem}>
              📍 Address: 123 OneStop Street, City, Country
            </p>
            <p style={styles.contactItem}>📧 Email: support@onestop.com</p>
            <p style={styles.contactItem}>📞 Phone: +1 (123) 456-7890</p>
            <p style={styles.contactItem}>
              🕒 Working Hours: Mon - Sat (9:00 AM - 9:00 PM)
            </p>
            <p style={styles.contactItem}>
              🔗 Social Media: Facebook | Twitter | Instagram
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
