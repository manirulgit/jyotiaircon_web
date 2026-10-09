import { Container, Nav, Navbar } from 'react-bootstrap';
import homeIcon from '../../../assets/home-icon.png';
import employeeIcon from '../../../assets/employee-icon.png';
import ticketIcon from '../../../assets/ticket-icon.png';
import seetingIcon from '../../../assets/seeting-icon.png';
import customerIcon from '../../../assets/customer-icon.png';
import productIcon from '../../../assets/product-icon.png';
import attandanceIcon from '../../../assets/attandence-icon.png';
import locationIcon from '../../../assets/location-icon.png';
import videoIcon from '../../../assets/video-icon.png';
import payrollIcon from '../../../assets/payroll-icon.png';
import expenseIcon from '../../../assets/expense-icon.png';
import logoutIcon from '../../../assets/logout.png';


import logo from '../../../assets/logo.png';
import './Header.css';

function Header() {
    return (
        <header>
            <div className='container-fluid w-100 h-100'>
                <div className='row'>
                    <Navbar expand="lg" className="custom-navbar">
                        <Container>
                            <div className='row align-items-center w-100'>
                                <div className='col-md-2 d-flex justify-content-center'>
                                    <img src={logo} className='logo' alt="Logo" />
                                </div>
                                <div className='col-md-10 d-flex align-items-center'>
                                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className='me-auto menu-nav'>
                                            <div className='menubox'>
                                                <Nav.Link href='dashboard'>
                                                    <img src={homeIcon} className='imgclass' alt="Home" />
                                                    <div className='menu-text'>Home</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='employee'>
                                                    <img src={employeeIcon} className='imgclass' alt="Employee" />
                                                    <div className='menu-text'>Employee</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='ListTicket'>
                                                    <img src={ticketIcon} className='imgclass' alt="Ticket" />
                                                    <div className='menu-text'>Ticket</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='customer'>
                                                    <img src={customerIcon} className='imgclass' alt="Customer" />
                                                    <div className='menu-text'>Customer</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='listProduct'>
                                                    <img src={productIcon} className='imgclass' alt="Product" />
                                                    <div className='menu-text'>Products</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='attendance'>
                                                    <img src={attandanceIcon} className='imgclass' alt="Attendance" />
                                                    <div className='menu-text'>Attendance</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='location'>
                                                    <img src={locationIcon} className='imgclass' alt="Location" />
                                                    <div className='menu-text'>Location</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='payroll'>
                                                    <img src={payrollIcon} className='imgclass' alt="Payroll" />
                                                    <div className='menu-text'>Payroll</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='video'>
                                                    <img src={videoIcon} className='imgclass' alt="Video" />
                                                    <div className='menu-text'>Video</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='expenseList'>
                                                    <img src={expenseIcon} className='imgclass' alt="Expense" />
                                                    <div className='menu-text'>Expense</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='setting'>
                                                    <img src={seetingIcon} className='imgclass' alt="Setting" />
                                                    <div className='menu-text'>Setting</div>
                                                </Nav.Link>
                                            </div>
                                            <div className='menubox'>
                                                <Nav.Link href='logout'>
                                                    <img src={logoutIcon} className='imgclass' alt="Logout" />
                                                    <div className='menu-text'>Logout</div>
                                                </Nav.Link>
                                            </div>
                                        </Nav>
                                    </Navbar.Collapse>
                                </div>
                            </div>
                        </Container>
                    </Navbar>
                </div>
            </div>
        </header>
    );
}

export default Header;