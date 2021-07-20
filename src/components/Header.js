import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import ThemeContext from "../contexts/themeContext";
// import ThemeSwitcher from "./ThemeSwitcher";
import { Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';

const Header = () => {
	const history = useHistory();
	const { theme } = useContext(ThemeContext);

	const logout = () => {
		localStorage.removeItem('access_token');
		history.push("/login");
	}

	return (
		<>
			<Navbar bg="light" expand="lg">
				<Navbar.Brand href="#home">Trading diary</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="#home">Home</Nav.Link>
						<NavDropdown title="Settings" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Form inline>
						<Button variant="outline-success" onClick={logout}>Logout</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		</>
	)
};

export default Header;
