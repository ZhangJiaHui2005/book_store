import React from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import HeaderTitle from "../../../Components/Admin/HeaderTitle";
import { Button, Form } from "react-bootstrap";
import { useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        address: "",
        website: "",
    });

    function handleSubmit(e) {
        e.preventDefault();

        post("/admin/publishers/store", {
            onSuccess: () => {
                setData({
                    name: "",
                    address: "",
                    website: "",
                });
            },
        })
    }

    return (
        <AdminLayout>
            <div className="container my-5">
                <HeaderTitle title={"Create new publisher"} />

                <Form className="mt-4" onSubmit={handleSubmit}>
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
                            type="text"
                            placeholder="Enter website"
                            value={data.website}
                            onChange={(e) => setData("website", e.target.value)}
                        />
                        {errors.website && (
                            <div className="text-danger mt-1">
                                {errors.website}
                            </div>
                        )}
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={processing}>
                        Create Publisher
                    </Button>
                </Form>
            </div>
        </AdminLayout>
    );
}
