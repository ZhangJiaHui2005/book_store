import React from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { Button, Form } from "react-bootstrap";

export default function Edit({ publisher }) {
    const { data, setData, post, processing, errors } = useForm({
        name: publisher.name,
        address: publisher.address || "",
        website: publisher.website || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/publishers/${publisher.id}/update`, {
            onSuccess: () => {
                setData({
                    name: "",
                    address: "",
                    website: "",
                });
            },
        });
    };

    return (
        <AdminLayout>
            <div className="container my-5">
                <h1 className="mb-4">Edit {publisher.name}</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Publisher Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter publisher name"
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
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter address"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                        />
                        {errors.address && (
                            <div className="text-danger mt-1">
                                {errors.address}
                            </div>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                            type="url"
                            placeholder="Enter website URL"
                            value={data.website}
                            onChange={(e) => setData("website", e.target.value)}
                        />
                        {errors.website && (
                            <div className="text-danger mt-1">
                                {errors.website}
                            </div>
                        )}
                    </Form.Group>

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={processing}
                    >
                        Update Publisher
                    </Button>
                </Form>
            </div>
        </AdminLayout>
    )
}
