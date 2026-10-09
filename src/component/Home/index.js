function Home() {
    return (
        <div>
            <nav>
                <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', padding: 0 }}>
                    <li>
                        <a 
                            href="/" 
                            style={{ 
                                textDecoration: 'none', 
                                color: '#1976d2', 
                                fontWeight: 'bold', 
                                padding: '0.5rem 1rem', 
                                borderRadius: '4px', 
                                transition: 'background 0.2s, color 0.2s' 
                            }}
                            onMouseOver={e => { e.target.style.background = '#e3f2fd'; e.target.style.color = '#0d47a1'; }}
                            onMouseOut={e => { e.target.style.background = 'none'; e.target.style.color = '#1976d2'; }}
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a 
                            href="/about" 
                            style={{ 
                                textDecoration: 'none', 
                                color: '#1976d2', 
                                fontWeight: 'bold', 
                                padding: '0.5rem 1rem', 
                                borderRadius: '4px', 
                                transition: 'background 0.2s, color 0.2s' 
                            }}
                            onMouseOver={e => { e.target.style.background = '#e3f2fd'; e.target.style.color = '#0d47a1'; }}
                            onMouseOut={e => { e.target.style.background = 'none'; e.target.style.color = '#1976d2'; }}
                        >
                            About
                        </a>
                    </li>
                    <li>
                        <a 
                            href="/" 
                            style={{ 
                                textDecoration: 'none', 
                                color: '#1976d2', 
                                fontWeight: 'bold', 
                                padding: '0.5rem 1rem', 
                                borderRadius: '4px', 
                                transition: 'background 0.2s, color 0.2s' 
                            }}
                            onMouseOver={e => { e.target.style.background = '#e3f2fd'; e.target.style.color = '#0d47a1'; }}
                            onMouseOut={e => { e.target.style.background = 'none'; e.target.style.color = '#1976d2'; }}
                        >
                            Employees
                        </a>
                    </li>
                    <li>
                        <a 
                            href="/contact" 
                            style={{ 
                                textDecoration: 'none', 
                                color: '#1976d2', 
                                fontWeight: 'bold', 
                                padding: '0.5rem 1rem', 
                                borderRadius: '4px', 
                                transition: 'background 0.2s, color 0.2s' 
                            }}
                            onMouseOver={e => { e.target.style.background = '#e3f2fd'; e.target.style.color = '#0d47a1'; }}
                            onMouseOut={e => { e.target.style.background = 'none'; e.target.style.color = '#1976d2'; }}
                        >
                            Product
                        </a>
                    </li>
                    <li>
                        <a 
                            href="/contact" 
                            style={{ 
                                textDecoration: 'none', 
                                color: '#1976d2', 
                                fontWeight: 'bold', 
                                padding: '0.5rem 1rem', 
                                borderRadius: '4px', 
                                transition: 'background 0.2s, color 0.2s' 
                            }}
                            onMouseOver={e => { e.target.style.background = '#e3f2fd'; e.target.style.color = '#0d47a1'; }}
                            onMouseOut={e => { e.target.style.background = 'none'; e.target.style.color = '#1976d2'; }}
                        >
                            Contact
                        </a>
                    </li>
                     <li>
                        <a 
                            href="/jadmin" 
                            style={{ 
                                textDecoration: 'none', 
                                color: '#1976d2', 
                                fontWeight: 'bold', 
                                padding: '0.5rem 1rem', 
                                borderRadius: '4px', 
                                transition: 'background 0.2s, color 0.2s' 
                            }}
                            onMouseOver={e => { e.target.style.background = '#e3f2fd'; e.target.style.color = '#0d47a1'; }}
                            onMouseOut={e => { e.target.style.background = 'none'; e.target.style.color = '#1976d2'; }}
                        >
                            Admin
                        </a>
                    </li>
                </ul>   
            </nav>
            <section style={{ margin: '2rem 0', padding: '1.5rem', background: '#e3f2fd', borderRadius: '8px', boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)' }}>
                <h2 style={{ marginBottom: '1rem', color: '#1976d2' }}>Categories</h2>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 180px', background: '#fff', borderRadius: '6px', boxShadow: '0 1px 4px rgba(25,118,210,0.07)', padding: '1rem', minWidth: '180px', textAlign: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                         <span style={{ fontSize: '2rem', color: '#1976d2', display: 'block', marginBottom: '0.5rem' }}>💼</span>
                        <strong style={{ color: '#333' }}>HR</strong>
                    </div>
                    <div 
                        style={{ flex: '1 1 180px', background: '#fff', borderRadius: '6px', boxShadow: '0 1px 4px rgba(25,118,210,0.07)', padding: '1rem', minWidth: '180px', textAlign: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
                        onClick={() => window.location.href = '/payroll'}
                        onMouseOver={e => { e.target.style.boxShadow = '0 4px 12px rgba(25,118,210,0.15)'; e.target.style.transform = 'translateY(-2px)'; }}
                        onMouseOut={e => { e.target.style.boxShadow = '0 1px 4px rgba(25,118,210,0.07)'; e.target.style.transform = 'translateY(0)'; }}
                    >
                        <span style={{ fontSize: '2rem', color: '#1976d2', display: 'block', marginBottom: '0.5rem' }}>🧾</span>
                        <strong style={{ color: '#333' }}>Payroll</strong>
                    </div>
                    <div style={{ flex: '1 1 180px', background: '#fff', borderRadius: '6px', boxShadow: '0 1px 4px rgba(25,118,210,0.07)', padding: '1rem', minWidth: '180px', textAlign: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                        <span style={{ fontSize: '2rem', color: '#1976d2', display: 'block', marginBottom: '0.5rem' }}>📊</span>
                        <strong style={{ color: '#333' }}>Analytics</strong>
                    </div>
                    <div style={{ flex: '1 1 180px', background: '#fff', borderRadius: '6px', boxShadow: '0 1px 4px rgba(25,118,210,0.07)', padding: '1rem', minWidth: '180px', textAlign: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                        <span style={{ fontSize: '2rem', color: '#1976d2', display: 'block', marginBottom: '0.5rem' }}>📁</span>
                        <strong style={{ color: '#333' }}>Documents</strong>
                    </div>
                </div>
            </section>
            <section style={{ margin: '2rem 0', padding: '1.5rem', background: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h2 style={{ marginBottom: '1rem', color: '#333' }}>
                    <a href="/products" style={{ textDecoration: 'none', color: '#333', transition: 'color 0.3s' }} 
                       onMouseOver={e => e.target.style.color = '#1976d2'} 
                       onMouseOut={e => e.target.style.color = '#333'}>
                        Products 🛒
                    </a>
                </h2>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 220px', background: '#fff', borderRadius: '6px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', padding: '1rem', minWidth: '220px' }}>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>Payroll Management</h3>
                        <p style={{ margin: 0, color: '#555' }}>Automate salary calculations, deductions, and payslip generation.</p>
                    </div>
                    <div style={{ flex: '1 1 220px', background: '#fff', borderRadius: '6px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', padding: '1rem', minWidth: '220px' }}>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>Employee Directory</h3>
                        <p style={{ margin: 0, color: '#555' }}>Manage employee records, roles, and contact information.</p>
                    </div>
                    <div style={{ flex: '1 1 220px', background: '#fff', borderRadius: '6px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', padding: '1rem', minWidth: '220px' }}>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>Reports & Analytics</h3>
                        <p style={{ margin: 0, color: '#555' }}>Generate insightful payroll and HR reports for better decisions.</p>
                    </div>
                </div>
            </section>
           
            <footer
                style={{
                    marginTop: '3rem',
                    background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                    color: '#fff',
                    padding: '2rem 1rem 1rem 1rem',
                    borderRadius: '12px 12px 0 0',
                    boxShadow: '0 -2px 12px rgba(25, 118, 210, 0.08)',
                    textAlign: 'center',
                    fontSize: '1rem'
                }}
            >
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    <a href="/privacy" style={{ color: '#fff', textDecoration: 'underline', margin: '0 0.5rem' }}>Privacy Policy</a>
                    <a href="/terms" style={{ color: '#fff', textDecoration: 'underline', margin: '0 0.5rem' }}>Terms of Service</a>
                    <a href="/contact" style={{ color: '#fff', textDecoration: 'underline', margin: '0 0.5rem' }}>Contact</a>
                </div>
                <div style={{ opacity: 0.85 }}>
                    &copy; {new Date().getFullYear()} Payroll App. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

export default Home;