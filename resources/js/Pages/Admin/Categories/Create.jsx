import React from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import HeaderTitle from "../../../Components/Admin/HeaderTitle";
import { Button, Form } from "react-bootstrap";
import { useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
    });

    function handleSubmit(e) {
        e.preventDefault();

        post("/admin/categories/store", {
            onSuccess: () => {
                setData({
                    name: "",
                    description: ""
                })
            }
        })
    }

    return (
        <AdminLayout>
            <div className="container my-5">
                <HeaderTitle title={"Create New Category"} />

                <Form className="mt-4" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter category name"
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
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />

                        {errors.description && (
                            <div className="text-danger mt-1">
                                {errors.description}
                            </div>
                        )}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Create Category
                    </Button>
                </Form>
            </div>
        </AdminLayout>
    );
}
