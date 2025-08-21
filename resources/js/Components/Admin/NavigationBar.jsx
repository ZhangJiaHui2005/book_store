import { Link } from "@inertiajs/react";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";

export default function NavigationBar() {
    return (
        <Navbar expand="lg" className="bg-secondary">
            <div className="container">
                <Navbar.Brand href="/admin/">Hui's Bookstore Admin</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/admin/">
                            Dashboard
                        </Nav.Link>

                        <Nav.Link href="/admin/books">
                            Books
                        </Nav.Link>

                        <Nav.Link href="/admin/authors">
                            Authors
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}