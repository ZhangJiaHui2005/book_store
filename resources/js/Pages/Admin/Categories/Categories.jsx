import React from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import HeaderTitle from "../../../Components/Admin/HeaderTitle";
import { Alert, Button, Modal, Table } from "react-bootstrap";
import { Link, usePage } from "@inertiajs/react";
import { PenFill, PlusCircle, Trash, Trash2, Trash2Fill } from "react-bootstrap-icons";
import { toast } from "react-toastify";

export default function Categories({ categories }) {
    const [show, setShow] = React.useState(false);
    const { flash } = usePage().props;

    const handleCloseModal = () => setShow(false);
    const handleShowModal = () => setShow(true);

    React.useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    return (
        <AdminLayout>
            <div className="container my-5 d-flex align-items-center justify-content-between">
                <HeaderTitle title={"List of Categories"} />

                <Button
                    variant="dark"
                    as={Link}
                    href="/admin/categories/create"
                    className="d-flex align-items-center gap-2"
                >
                    Add New Category <PlusCircle />
                </Button>
            </div>

            <div className="container">
                {categories.length === 0 ? (
                    <Alert variant="danger">
                        <h4 className="text-center">
                            No categories found in the database.
                        </h4>
                    </Alert>
                ) : (
                    <Table hover striped bordered responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            as={Link}
                                            href={`/admin/categories/${category.id}/edit`}
                                        >
                                            <PenFill />
                                        </Button>

                                        <Button variant="danger" className="ms-2" onClick={handleShowModal}>
                                            <Trash2Fill />
                                        </Button>

                                        <Modal show={show} onHide={handleCloseModal}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Delete Category</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                Are you sure you want to delete this category?
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseModal}>
                                                    Close
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    as={Link}
                                                    href={`/admin/categories/${category.id}/delete`}
                                                    method="delete"
                                                    onClick={handleCloseModal}
                                                >
                                                    Delete
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
