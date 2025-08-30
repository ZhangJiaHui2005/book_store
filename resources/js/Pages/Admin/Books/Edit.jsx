import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Form, Button, Container } from "react-bootstrap";
import Select from "react-select";
import AdminLayout from "../../../Layouts/AdminLayout";

export default function Edit({ book }) {
    const { publishers = [], authors = [], categories = [] } = usePage().props;

    // Build options as STRINGS (prevents 1 vs "1" mismatch)
    const publisherOptions = publishers.map((publisher) => ({
        value: String(publisher.id),
        label: publisher.name,
    }));
    const authorOptions = authors.map((author) => ({
        value: author.id,
        label: author.name,
    }));
    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const { data, setData, post, processing, errors } = useForm({
        title: book.title || "",
        isbn: "",
        published_year: "",
        price: "",
        stock: "",
        // store ids as STRINGS
        publisher_id: "",
        authors: [], // array of string ids
        categories: [], // array of string ids
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();

        // Build payload with IDs (strings are fine for backend)
        const payload = {
            title: data.title,
            isbn: data.isbn,
            published_year: data.published_year,
            price: data.price,
            stock: data.stock,
            publisher_id: data.publisher_id || null,
            authors: data.authors, // ['1','3',...]
            categories: data.categories, // ['2','5',...]
            image: data.image,
        };

        // Use router.post or useForm().post with data override
        post("/admin/books/update", {
            data: payload,
            forceFormData: true,
            onSuccess: () => {
                setData({
                    title: "",
                    isbn: "",
                    published_year: "",
                    price: "",
                    stock: "",
                    publisher_id: "",
                    authors: [],
                    categories: [],
                    image: null,
                });
            },
        });
    };

    return (
        <AdminLayout>
            <Container className="my-5">
                <h2 className="mb-3">Edit Book</h2>

                <Form onSubmit={submit} encType="multipart/form-data">
                    {/* Title */}
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            isInvalid={!!errors.title}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* ISBN */}
                    <Form.Group className="mb-3">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control
                            type="text"
                            value={data.isbn}
                            onChange={(e) => setData("isbn", e.target.value)}
                            isInvalid={!!errors.isbn}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.isbn}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Published Year */}
                    <Form.Group className="mb-3">
                        <Form.Label>Published Year</Form.Label>
                        <Form.Control
                            type="number"
                            value={data.published_year}
                            onChange={(e) =>
                                setData("published_year", e.target.value)
                            }
                            isInvalid={!!errors.published_year}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.published_year}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Price */}
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                            isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.price}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Stock */}
                    <Form.Group className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            value={data.stock}
                            onChange={(e) => setData("stock", e.target.value)}
                            isInvalid={!!errors.stock}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.stock}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Publisher (single) */}
                    <Form.Group className="mb-3">
                        <Form.Label>Publisher</Form.Label>
                        <Select
                            options={publisherOptions}
                            // react-select expects the whole option for `value`
                            value={
                                publisherOptions.find(
                                    (o) => o.value === data.publisher_id
                                ) || null
                            }
                            onChange={(opt) =>
                                setData("publisher_id", opt ? opt.value : "")
                            }
                            isClearable
                            closeMenuOnSelect={false}
                        />
                        {errors.publisher_id && (
                            <div className="text-danger">
                                {errors.publisher_id}
                            </div>
                        )}
                    </Form.Group>

                    {/* Authors (multi) */}
                    <Form.Group className="mb-3">
                        <Form.Label>Authors</Form.Label>
                        <Select
                            isMulti
                            options={authorOptions}
                            value={data.authors
                                .map((id) =>
                                    authorOptions.find(
                                        (opt) => opt.value === parseInt(id)
                                    )
                                )
                                .filter(Boolean)}
                            onChange={(selected) => {
                                const selectedIds = selected
                                    ? selected.map((option) =>
                                          option.value.toString()
                                      )
                                    : [];
                                setData("authors", selectedIds);
                            }}
                            closeMenuOnSelect={false}
                        />
                        {errors.authors && (
                            <div className="text-danger">{errors.authors}</div>
                        )}
                    </Form.Group>

                    {/* Categories (multi) */}
                    <Form.Group className="mb-3">
                        <Form.Label>Categories</Form.Label>
                        <Select
                            isMulti
                            options={categoryOptions}
                            value={data.categories
                                .map((id) =>
                                    categoryOptions.find(
                                        (opt) => opt.value === parseInt(id)
                                    )
                                )
                                .filter(Boolean)}
                            onChange={(selected) => {
                                const selectedIds = selected
                                    ? selected.map((option) =>
                                          option.value.toString()
                                      )
                                    : [];
                                setData("categories", selectedIds);
                            }}
                            closeMenuOnSelect={false}
                        />
                        {errors.categories && (
                            <div className="text-danger">
                                {errors.categories}
                            </div>
                        )}
                    </Form.Group>

                    {/* Image */}
                    <Form.Group className="mb-3">
                        <Form.Label>Book Cover</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setData("image", e.target.files[0])
                            }
                            isInvalid={!!errors.image}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.image}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit" disabled={processing}>
                        {processing ? "Saving..." : "Save Book"}
                    </Button>
                </Form>
            </Container>
        </AdminLayout>
    );
}
