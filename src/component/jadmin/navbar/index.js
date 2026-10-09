import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { AiOutlinePayCircle } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

import "./Navbar.css";

function Nabvar() {
    const style = { color: "black", fontSize: 1 }
    return (
        <div class="wrapper">
            <div className='container-fluid '>
                <div className='row'>
                    <div className='menubar'>

                        <Navbar expand="lg">
                            <Container>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link href="home">Home</Nav.Link>
                                        <Nav.Link href="liveStatus">Live Status</Nav.Link>
                                        <Nav.Link href="home">Home</Nav.Link>
                                        <Nav.Link href="link">Link</Nav.Link>
                                        <Nav.Link href="home">Home</Nav.Link>
                                        <Nav.Link href="link">Link</Nav.Link>
                                        <Nav.Link href="home">Home</Nav.Link>
                                        <Nav.Link href="link">Link</Nav.Link>
                                        <Nav.Link href="home">Home</Nav.Link>
                                        <Nav.Link href="link">Link</Nav.Link>
                                        <Nav.Link href="home">Home</Nav.Link>

                                        <Nav.Link href="link">Link</Nav.Link>
                                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.2">
                                                Another action
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="#action/3.4">
                                                Separated link
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown title="Profile" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Nabvar;