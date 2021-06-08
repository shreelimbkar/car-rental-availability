import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function CarAvailability() {

    const [cars, setCars] = useState(null);
    const [vehRentalCore, setVehRentalCore] = useState(null);
    const [vehVendorAvails, setVehVendorAvails] = useState(null);
    const [arrAvailableCars, setArrAvailableCars] = useState([]);
    // const [vendors, setVendors] = useState([]);
    const [vehCode, setVehCode] = useState("");
    // let vendors = [];

    useEffect(() => {
        getCarsData();
        setVehCode("All");
        // console.log("vehRentalCore", cars.VehRentalCore, vehRentalCore);
    }, []);

    useEffect(() => {
        if (cars) {
            // console.log("cars", cars);
            setVehRentalCore(cars.VehRentalCore);
            setVehVendorAvails(cars.VehVendorAvails);
            // console.log("cars.VehRentalCore", cars.VehRentalCore);
            // console.log("cars.VehVendorAvails", cars.VehVendorAvails);
            const ar = getAvailableCars(Event, vehVendorAvails, vehCode);
            // console.log('ar', ar);
            setArrAvailableCars(ar);
        }
    }, [cars, vehVendorAvails, vehCode]);

    const getCarsData = async () => {
        const response = await fetch("http://www.cartrawler.com/ctabe/cars.json");
        const data = await response.json();
        // console.log("data", data[0].VehAvailRSCore)
        setCars(data[0].VehAvailRSCore);
    }

    const getAvailableCars = (evt, vehVendorAvails, venCode) => {
        // console.log("vendors", vendors);
        console.log("vehVendorAvails, venCode", vehVendorAvails, venCode);
        let arrCA, filteredCars;
        if (vehVendorAvails && venCode === "All") {
            // vendors.push("All");
            // console.log("IF venCode", venCode);
            arrCA =  vehVendorAvails.reduce(
                (arr, elem) => arr.concat(elem.VehAvails), []
            );
            setArrAvailableCars(arrCA);
        } else {
            if (vehVendorAvails) {
                const hasActive = evt.target.classList;
                // vendors = [...vendors, venCode];
                console.log('ELSE EVENT', evt);
                if (hasActive.length) {
                    evt.target.classList.remove("active");
                } else {
                    evt.target.classList.add("active");
                }
                
                // evt.target.classList.remove("active");
                vehVendorAvails.filter((c) => {
                    if (c.Vendor["@Code"] === venCode) {
                        filteredCars = c.VehAvails;
                    }
                    // filteredCars = {...filteredCars };
                    return filteredCars;
                })
            }
            setArrAvailableCars(filteredCars);
        }
        // console.log("arrCA", arrCA);
        return arrCA;
    }

    return (
        <>
            { vehRentalCore && (
                <div className="legends">
                    <h2>Pickup/Return information (Legend)</h2>
                    <div className="vehRental">
                        <ul>
                            <li>PickUp Date: { vehRentalCore["@PickUpDateTime"]}</li>
                            <li>Return Date: { vehRentalCore["@ReturnDateTime"]}</li>
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
                                // vendors.push(vCode);
                            return (<li key={index} className="" onClick={(e)=> {getAvailableCars(e, vehVendorAvails, vCode)}}>{ vName } ({ vCode })</li>)
                        })}
                            </ul>
                    {/* {console.log("vehVendorAvails", vehVendorAvails)} */}
                    </div>
                )
            }
            {
                vehVendorAvails && arrAvailableCars && (
                    <div className="vehAvails">
                        <h2>Available Cars</h2>
                        {/* {
                            console.log("setArrAvailableCars", arrAvailableCars)
                        } */}
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
