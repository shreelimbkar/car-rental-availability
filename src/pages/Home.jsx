import React from 'react';

import CarAvailability from "../components/CarAvailability";

export default function Home() {
    return (
        <div className="container">
            <h1>Car rental availability</h1>
            <CarAvailability />
        </div>
    )
}
