import { Container, Nav, Navbar } from 'react-bootstrap';

import './Header.css';

function Header() {
    return (
        <header>
            <div className='container-fluid w-100 h-100'>
                <div className='row'>
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
                </div>
            </div>
        </header>
    );
}

export default Header;