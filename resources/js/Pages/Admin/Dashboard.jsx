import React from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { ArrowRight } from "react-bootstrap-icons";

export default function Dashboard() {
    return (
        <AdminLayout>
            <div className="p-5 bg-light">
                <div className="container">
                    <h1 className=" fw-bolder fs-1">Welcome to Admin Page</h1>
                    <p className="my-5 fs-2 fst-italic">
                        Where you can manage everything in the bookstore like a
                        god
                    </p>

                    <a href="#dashboard" className="text-black">
                        Go to dashboard <ArrowRight />
                    </a>
                </div>
            </div>

            <div id="dashboard"></div>
        </AdminLayout>
    );
}
