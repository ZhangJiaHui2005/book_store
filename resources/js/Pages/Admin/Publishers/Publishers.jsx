import React from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import HeaderTitle from "../../../Components/Admin/HeaderTitle";
import { Button, Modal } from "react-bootstrap";
import { ExclamationCircleFill, PenFill, PlusCircle, Trash2Fill } from "react-bootstrap-icons";
import { Link, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function Publishers({ publishers }) {
    const { flash } = usePage().props;
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    const handleCloseModal = () => setShow(false);
    const handleShowModal = () => setShow(true);

    return (
        <AdminLayout>
            <div className=" container my-5 d-flex justify-content-between align-items-center">
                <HeaderTitle title={"List of publishers"} />

                <Button variant="dark">
                    <Link
                        className="text-decoration-none"
                        href="/admin/publishers/create"
                    >
                        <span className="text-white d-flex align-items-center gap-2">
                            Add New Publisher <PlusCircle />
                        </span>
                    </Link>
                </Button>
            </div>

            <div className="container mt-4">
                {publishers.length === 0 ? (
                    <div className="alert alert-danger mt-4">
                        <h4 className="text-center">
                            No publishers found in the database.
                        </h4>
                    </div>
                ) : (
                    <table className="table table-hover table-striped table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Website</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {publishers.map((publisher) => (
                                <tr key={publisher.id}>
                                    <td>{publisher.id}</td>
                                    <td>{publisher.name}</td>
                                    <td>
                                        {publisher.address ? (
                                            <span>{publisher.address}</span>
                                        ) : (
                                            <span>No address</span>
                                        )}
                                    </td>
                                    <td>
                                        {publisher.website ? (
                                            <span>{publisher.website}</span>
                                        ) : (
                                            <span>No website</span>
                                        )}
                                    </td>
                                    <td>
                                        <Link
                                            href={`/admin/publishers/${publisher.id}/edit`}
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
                                                this publisher? This action cannot
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
                                                    href={`/admin/publishers/${publisher.id}/delete`}
                                                    method="delete"
                                                    variant="danger"
                                                >
                                                    Delete Publisher
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AdminLayout>
    );
}
