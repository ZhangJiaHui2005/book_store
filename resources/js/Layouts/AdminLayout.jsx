import React from "react";
import NavigationBar from "../Components/Admin/NavigationBar";

export default function AdminLayout({ children }) {
    return (
        <div>
            <NavigationBar />

            <div>
                {children}
            </div>
        </div>
    )
}