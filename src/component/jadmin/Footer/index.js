function Footer() {
    return (
        <footer className='footer' style={{
            background: '#1976d2',
            color: '#fff',
            padding: '1.5rem 0',
            textAlign: 'center',
            marginTop: '2rem',
            boxShadow: '0 -2px 8px rgba(25, 118, 210, 0.08)'
        }}>
            <div className='footer-content' style={{
                maxWidth: '900px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <p style={{ margin: 0, fontSize: '1rem', letterSpacing: '0.5px' }}>
                    &copy; 2023 Your Company. All rights reserved.
                </p>
                <div style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>
                    <a href="/privacy" style={{ color: '#fff', textDecoration: 'underline', marginRight: '1rem' }}>Privacy Policy</a>
                    <a href="/terms" style={{ color: '#fff', textDecoration: 'underline' }}>Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;