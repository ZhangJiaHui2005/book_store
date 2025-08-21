import React from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Form, Button } from "react-bootstrap";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        birth_year: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/authors/store", {
            onSuccess: () => {
                setData({
                    name: "",
                    birth_year: "",
                });

                toast.success("Author created successfully!");
            },
        });
    };

    return (
        <AdminLayout>
            <div className="container mt-5">
                <h1 className="mb-4">Create New Author</h1>

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
                        Create Author
                    </Button>
                </Form>
            </div>
        </AdminLayout>
    );
}
