import React from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import HeaderTitle from "../../../Components/Admin/HeaderTitle";
import { Alert, Button, Modal, Table } from "react-bootstrap";
import { Link } from "@inertiajs/react";
import { ExclamationCircleFill, PenFill, PlusCircle, Trash2Fill } from "react-bootstrap-icons";

export default function Books({ books }) {
    const [show, setShow] = React.useState(false);
    
    const handleCloseModal = () => setShow(false);
    const handleShowModal = () => setShow(true);

    return (
        <AdminLayout>
            <div className="container my-5 d-flex align-items-center justify-content-between">
                <HeaderTitle title={"List of Books"} />

                <Button variant="dark">
                    <Link
                        href={"/admin/books/create"}
                        className=" text-decoration-none"
                    >
                        <span className="d-flex align-items-center gap-2 text-white">
                            Add New Book
                            <PlusCircle />
                        </span>
                    </Link>
                </Button>
            </div>

            <div className="container">
                {books.length === 0 ? (
                    <Alert variant="danger">
                        <h4 className="text-center">
                            No books found in the database.
                        </h4>
                    </Alert>
                ) : (
                    <Table hover striped bordered responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Publisher</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>
                                        {book.authors
                                            .map((author) => author.name)
                                            .join(", ")}
                                    </td>
                                    <td>
                                        {book.categories
                                            .map((category) => category.name)
                                            .join(", ")}
                                    </td>
                                    <td>{book.publisher?.name}</td>
                                    <td>
                                        $
                                        {parseFloat(book.price || 0).toFixed(2)}
                                    </td>
                                    <td>{book.stock}</td>
                                    <td>
                                        <Link
                                            href={`/admin/books/${book.id}/edit`}
                                            className="btn btn-primary me-2"
                                        >
                                            <PenFill />
                                        </Link>

                                        <Button
                                            variant="danger"
                                            onClick={handleShowModal}
                                        >
                                            <Trash2Fill />
                                        </Button>

                                        <Modal
                                            show={show}
                                            onHide={handleCloseModal}
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title>
                                                    Warning{" "}
                                                    <ExclamationCircleFill />
                                                </Modal.Title>
                                            </Modal.Header>

                                            <Modal.Body>
                                                Are you sure you want to delete
                                                this book? This action cannot
                                                be undone.
                                            </Modal.Body>

                                            <Modal.Footer>
                                                <Button
                                                    variant="secondary"
                                                    onClick={handleCloseModal}
                                                >
                                                    Close
                                                </Button>
                                                <Button
                                                    onClick={handleCloseModal}
                                                    as={Link}
                                                    href={`/admin/books/${book.id}/delete`}
                                                    method="delete"
                                                    variant="danger"
                                                >
                                                    Delete Book
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </AdminLayout>
    );
}
