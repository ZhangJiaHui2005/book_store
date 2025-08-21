import React from "react";
import { Button } from "react-bootstrap";

export default function Home() {
    return (
        <div>
            <h1 className="text-xl text-red-800">Welcome to my bookstore</h1>
            <Button variant="primary">Click Me</Button>
        </div>
    )
}