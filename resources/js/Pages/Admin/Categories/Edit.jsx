import { useForm } from "@inertiajs/react";
import React from "react";
import { Button, Form } from "react-bootstrap";
import AdminLayout from "../../../Layouts/AdminLayout";

export default function Edit({ category }) {
    const { data, setData, post, processing, errors } = useForm({
        name: category.name,
        description: category.description || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/categories/${category.id}/update`, {
            onSuccess: () => {
                setData({
                    name: "",
                    description: "",
                });
            },
        });
    };

    return (
        <AdminLayout>
            <div className="container my-5">
                <h1 className="mb-4">Edit {category.name}</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter category name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && (
                            <div className="text-danger mt-1">{errors.name}</div>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter description"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                        />
                        {errors.description && (
                            <div className="text-danger mt-1">{errors.description}</div>
                        )}
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={processing}>
                        Save Changes
                    </Button>
                </Form>
            </div>
        </AdminLayout>
    );
}