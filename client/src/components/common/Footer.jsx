import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-info">
          <div className="nav-logo">
            EPICURE<span>.</span>
          </div>
          <p>High-end catering management for the modern host.</p>
        </div>
        <div className="footer-contact">
          <h4>Contact Details</h4>
          <p>Address: 101 Culinary Plaza, Suite 500</p>
          <p>Phone: +1 800-EPICURE</p>
          <p>Email: hello@epicure-catering.com</p>
        </div>
      </div>
      <div className="footer-legal">
        <p>© 2026 EPICURE CATERING. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}
