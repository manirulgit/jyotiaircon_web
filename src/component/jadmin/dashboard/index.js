import Footer from '../Footer';
import Header from '../header';
import Nabvar from '../navbar';
import './Dashboard.css';

function Dashboard() {
    return (
        <div>
            <Header />  

            <section style={{ margin: '2rem 0', padding: '1.5rem', background: '#e3f2fd', borderRadius: '8px', boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)' }}>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <a href="/addCustomer" style={{ textDecoration: 'none' }}>
                        <div style={{ flex: '1 1 180px', background: '#fff', borderRadius: '6px', boxShadow: '0 1px 4px rgba(25,118,210,0.07)', padding: '1rem', minWidth: '180px', textAlign: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                            <span style={{ fontSize: '2rem', color: '#1976d2', display: 'block', marginBottom: '0.5rem' }}>💼</span>
                            <strong style={{ color: '#333' }}>Add Customer</strong>
                        </div>
                    </a>
                    {/* <a href="/payroll" style={{ textDecoration: 'none' }}>
                        <div style={{ flex: '1 1 180px', background: '#fff', borderRadius: '6px', boxShadow: '0 1px 4px rgba(25,118,210,0.07)', padding: '1rem', minWidth: '180px', textAlign: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                            <span style={{ fontSize: '2rem', color: '#1976d2', display: 'block', marginBottom: '0.5rem' }}>🧾</span>
                            <strong style={{ color: '#333' }}>Payroll</strong>
                        </div>
                    </a> */}
                    {/* <div style={{ flex: '1 1 180px', background: '#fff', borderRadius: '6px', boxShadow: '0 1px 4px rgba(25,118,210,0.07)', padding: '1rem', minWidth: '180px', textAlign: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                        <span style={{ fontSize: '2rem', color: '#1976d2', display: 'block', marginBottom: '0.5rem' }}>📊</span>
                        <strong style={{ color: '#333' }}>Analytics</strong>
                    </div> */}
                    {/* <div style={{ flex: '1 1 180px', background: '#fff', borderRadius: '6px', boxShadow: '0 1px 4px rgba(25,118,210,0.07)', padding: '1rem', minWidth: '180px', textAlign: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                        <span style={{ fontSize: '2rem', color: '#1976d2', display: 'block', marginBottom: '0.5rem' }}>📁</span>
                        <strong style={{ color: '#333' }}>Documents</strong>
                    </div> */}
                </div>
            </section>
            <section style={{ margin: '2rem 0', padding: '1.5rem', background: '#e3f2fd', borderRadius: '8px', boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)' }}>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 180px', background: '#fff', borderRadius: '6px', boxShadow: '0 1px 4px rgba(25,118,210,0.07)', padding: '1rem', minWidth: '180px', textAlign: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                        <span style={{ fontSize: '2rem', color: '#1976d2', display: 'block', marginBottom: '0.5rem' }}>💼</span>
                        <strong style={{ color: '#333' }}>HR</strong>
                    </div>
                    {/* <a href="/payroll" style={{ textDecoration: 'none' }}>
                        <div style={{ flex: '1 1 180px', background: '#fff', borderRadius: '6px', boxShadow: '0 1px 4px rgba(25,118,210,0.07)', padding: '1rem', minWidth: '180px', textAlign: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                            <span style={{ fontSize: '2rem', color: '#1976d2', display: 'block', marginBottom: '0.5rem' }}>🧾</span>
                            <strong style={{ color: '#333' }}>Payroll</strong>
                        </div>
                    </a> */}
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
            <Footer />
        </div>
    );
}

export default Dashboard