import React from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Edit({ author }) {
    const { data, setData, post, processing, errors } = useForm({
        name: author.name,
        birth_year: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/authors/${author.id}/update`, {
            onSuccess: () => {
                toast.success("Author updated successfully!");
                setData({
                    name: "",
                    birth_year: "",
                });
            },
        });
    };

    return (
        <AdminLayout>
            <div className="container my-5">
                <h1 className="mb-4">Edit {author.name}</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter author name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && (
                            <div className="text-danger mt-1">
                                {errors.name}
                            </div>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Birth Year</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter birth year"
                            value={data.birth_year}
                            onChange={(e) =>
                                setData("birth_year", e.target.value)
                            }
                        />
                        {errors.birth_year && (
                            <div className="text-danger mt-1">
                                {errors.birth_year}
                            </div>
                        )}
                    </Form.Group>

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={processing}
                    >
                        Update Author
                    </Button>
                </Form>
            </div>
        </AdminLayout>
    );
}
