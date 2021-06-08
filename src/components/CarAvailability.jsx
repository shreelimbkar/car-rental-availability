import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { getFormattedDate } from "../utils/utils";
import loader from "../assests/images/ajax-loader.gif";

export default function CarAvailability() {

    const [ loading, setLoading ] = useState(true);
    const [cars, setCars] = useState(null);
    const [vehRentalCore, setVehRentalCore] = useState(null);
    const [vehVendorAvails, setVehVendorAvails] = useState(null);
    const [arrAvailableCars, setArrAvailableCars] = useState([]);
    const [vehCode, setVehCode] = useState("");

    useEffect(() => {
        getCarsData();
        setVehCode("All");
    }, []);

    useEffect(() => {
        if (cars) {
            setVehRentalCore(cars.VehRentalCore);
            setVehVendorAvails(cars.VehVendorAvails);
            const ar = getAvailableCars(Event, vehVendorAvails, vehCode);
            setArrAvailableCars(ar);
        }
    }, [cars, vehVendorAvails, vehCode]);

    const getCarsData = async () => {
        setLoading(true);
        const response = await fetch("https://www.cartrawler.com/ctabe/cars.json");
        const data = await response.json();
        setCars(data[0].VehAvailRSCore);
        setLoading(false);
    }

    const getAvailableCars = (evt, vehVendorAvails, venCode) => {
        let arrCA, filteredCars;
        if (vehVendorAvails && venCode === "All") {
            arrCA =  vehVendorAvails.reduce(
                (arr, elem) => arr.concat(elem.VehAvails), []
            );
            setArrAvailableCars(arrCA);
        } else {
            if (vehVendorAvails) {
                const hasActive = evt.target.classList;
                if (hasActive.length) {
                    evt.target.classList.remove("active");
                } else {
                    evt.target.classList.add("active");
                }
                
                vehVendorAvails.filter((c) => {
                    if (c.Vendor["@Code"] === venCode) {
                        filteredCars = c.VehAvails;
                    }
                    return filteredCars;
                })
            }
            setArrAvailableCars(filteredCars);
        }
        return arrCA;
    }

    const ShowLoader = (() => {
        return (
            <div className="loadding">
                <img src={loader} alt="loading..." />
            </div>
        )
    });

    return (
        <>
            { loading && !vehRentalCore ?
                (
                    <ShowLoader />
                ) :
                (
                <div className="legends">
                    <h2>Pickup/Return information (Legend)</h2>
                    <div className="vehRental">
                        <ul>
                            <li>PickUp Date: { getFormattedDate(vehRentalCore["@PickUpDateTime"])}</li>
                            <li>Return Date: { getFormattedDate(vehRentalCore["@ReturnDateTime"])}</li>
                            <li>PickUp Location: { vehRentalCore.PickUpLocation["@Name"]}</li>
                            <li>Return Location: { vehRentalCore.ReturnLocation["@Name"]}</li>
                        </ul>
                    </div>
                    
                </div> 
                ) 
            }
            {
                vehVendorAvails && (
                    <div className="vehVendor">
                        <h2>Vendors</h2>
                        <ul>
                            {vehVendorAvails.map((ven, index) => {
                                const vName = ven.Vendor["@Name"];
                                const vCode = ven.Vendor["@Code"];
                            return (<li key={index} className="" onClick={(e)=> {getAvailableCars(e, vehVendorAvails, vCode)}}>{ vName } ({ vCode })</li>)
                        })}
                            </ul>
                    </div>
                )
            }
            {
                vehVendorAvails && arrAvailableCars && (
                    <div className="vehAvails">
                        <h2>Available Cars</h2>
                        <main className="cards">
                            {
                                arrAvailableCars.map((car, index) => {
                                    return (
                                        <article className="card" key={index}>
                                            <Link to={{
                                            pathname: "/car-details",
                                            state: car
                                            }}>
                                                <img src={car.Vehicle.PictureURL} alt={car.Vehicle.VehMakeModel["@Name"]} title={car.Vehicle.VehMakeModel["@Name"]} />
                                                <div className="text">
                                                    <h4>{car.Vehicle.VehMakeModel["@Name"]}</h4>
                                                    <p>
                                                        <span className="title">Total Charge</span><span className="card-text">{(car.TotalCharge["@CurrencyCode"])} {(car.TotalCharge["@RateTotalAmount"])} </span>
                                                        {/* <span className="title">Air Condition</span><span className="card-text">{(car.Vehicle["@AirConditionInd"]) ? "Available" : "UnAvailable"}</span>
                                                        <span className="title">Transmission Type</span><span className="card-text">{car.Vehicle["@TransmissionType"]}</span> */}
                                                        <span className="title">Fuel Type</span><span className="card-text">{car.Vehicle["@FuelType"]}</span>
                                                        {/* <span className="title">Drive Type</span><span className="card-text">{car.Vehicle["@DriveType"]}</span> */}
                                                        <span className="title">Passenger Quantity</span><span className="card-text">{car.Vehicle["@PassengerQuantity"]}</span>
                                                        {/* <span className="title">Baggage Quantity</span><span className="card-text">{car.Vehicle["@BaggageQuantity"]}</span> */}
                                                    </p>
                                                </div>
                                            </Link>
                                        </article>  
                                    )
                                })
                            }
                        </main>
                    </div>
                )
            }
        </>
    )
}
