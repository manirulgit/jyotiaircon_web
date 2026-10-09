import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2023 Your Company Name. All rights reserved.</p>
                <ul className="footer-links">
                    <li><a href="/privacy-policy">Privacy Policy</a></li>
                    <li><a href="/terms-of-service">Terms of Service</a></li>
                    <li><a href="/contact-us">Contact Us</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;