import React, { Component } from 'react'
import {Navbar, Container, Nav, Button, Form, FormControl, NavDropdown} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MyNav extends Component {
    state={
        search : ""
    }

    keypress = (e) => {
        console.log("Key has been pressed: ", e.target.value);
        this.setState({
            search: e.target.value
        })
    }
    render() {
        return (
            <div>
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Navbar.Brand href="#home">Digit</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                        <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" value={this.state.search} onChange={(e) => {
                            this.keypress(e);
                            this.props.searchQuery(e.target.value)
                        }
                            } />
                        {/* <Button variant="outline-success">Search</Button> */}
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
