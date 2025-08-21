import React from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Alert, Button, Modal, Table } from "react-bootstrap";
import {
    ExclamationCircleFill,
    PenFill,
    PlusCircle,
    Trash2Fill,
} from "react-bootstrap-icons";
import { Link, usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Authors({ authors }) {
    const [show, setShow] = React.useState(false);
    const { flash } = usePage().props;

    React.useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    const handleCloseModal = () => setShow(false);
    const handleShowModal = () => setShow(true);

    return (
        <AdminLayout>
            <ToastContainer />
            <div className="container mt-5 d-flex justify-content-between align-items-center">
                <h1>List of authors</h1>

                <Button variant="dark">
                    <Link
                        href="/admin/authors/create"
                        className="d-flex align-items-center text-decoration-none"
                    >
                        <span className="text-white d-flex align-items-center gap-2">
                            Add New Author <PlusCircle />
                        </span>
                    </Link>
                </Button>
            </div>

            <div className="container mt-4">
                {authors.length === 0 ? (
                    <Alert variant="danger" className="mt-4">
                        No authors found in the database.
                    </Alert>
                ) : (
                    <Table hover striped bordered responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Birth Year</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authors.map((author) => (
                                <tr key={author.id}>
                                    <td>{author.id}</td>
                                    <td>{author.name}</td>
                                    <td>{author.birth_year}</td>
                                    <td>
                                        <Link
                                            href={`/admin/authors/${author.id}/edit`}
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
                                                this author? This action cannot
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
                                                    href={`/admin/authors/${author.id}/delete`}
                                                    method="delete"
                                                    variant="danger"
                                                >
                                                    Delete Author
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
