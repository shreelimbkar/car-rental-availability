import React from 'react';
import { Link, useLocation } from "react-router-dom";

export default function CarDetails() {
    const location = useLocation();
    const { TotalCharge, Vehicle } = location.state;
    // console.log("Car details car = ", TotalCharge, Vehicle);
    return (
        <>
            <h1>Car Details</h1>
            <div className="vehAvails">
                <Link to="/">Go Back to Home</Link>
                <main className="cards">
                    <article className="card">
                        <img src={Vehicle.PictureURL} alt={Vehicle.VehMakeModel["@Name"]} title={Vehicle.VehMakeModel["@Name"]} />
                        <div className="text">
                            <h4>{Vehicle.VehMakeModel["@Name"]}</h4>
                            <p>
                                <span className="title">Total Charge</span><span className="card-text">{(TotalCharge["@CurrencyCode"])} {(TotalCharge["@RateTotalAmount"])} </span>
                                <span className="title">Air Condition</span><span className="card-text">{(Vehicle["@AirConditionInd"]) ? "Available" : "UnAvailable"}</span>
                                <span className="title">Transmission Type</span><span className="card-text">{Vehicle["@TransmissionType"]}</span>
                                <span className="title">Fuel Type</span><span className="card-text">{Vehicle["@FuelType"]}</span>
                                <span className="title">Drive Type</span><span className="card-text">{Vehicle["@DriveType"]}</span>
                                <span className="title">Passenger Quantity</span><span className="card-text">{Vehicle["@PassengerQuantity"]}</span>
                                <span className="title">Baggage Quantity</span><span className="card-text">{Vehicle["@BaggageQuantity"]}</span>
                            </p>
                        </div>
                    </article>
                </main>
            </div>
        </>
    )
}
