import React, {useEffect, useState} from 'react'

export default function CarAvailability() {

    const [cars, setCars] = useState(null);
    const [vehRentalCore, setVehRentalCore] = useState(null);
    const [vehVendorAvails, setVehVendorAvails] = useState(null);
    const [arrAvailableCars, setArrAvailableCars] = useState([]);
    const [vehCode, setVehCode] = useState("");

    useEffect(() => {
        getCarsData();
        setVehCode("All")
        // console.log("vehRentalCore", cars.VehRentalCore, vehRentalCore);
    }, []);

    useEffect(() => {
        if (cars) {
            // console.log("cars", cars);
            setVehRentalCore(cars.VehRentalCore);
            setVehVendorAvails(cars.VehVendorAvails);
            // console.log("cars.VehRentalCore", cars.VehRentalCore);
            // console.log("cars.VehVendorAvails", cars.VehVendorAvails);
            const ar = getAvailableCars(vehVendorAvails, vehCode);
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

    const getAvailableCars = (vehVendorAvails, venCode) => {
        console.log("vehVendorAvails, venCode", vehVendorAvails, venCode);
        let arrCA, filteredCars;
        if (vehVendorAvails && venCode === "All") {
            console.log("IF venCode", venCode);
            arrCA =  vehVendorAvails.reduce(
                (arr, elem) => arr.concat(elem.VehAvails), []
            );
        } else {
            // console.log("ELSE venCode", vehVendorAvails, venCode);
            if (vehVendorAvails) {
                vehVendorAvails.filter((c) => {
                    if (c.Vendor["@Code"] === venCode) {
                        filteredCars = c.VehAvails;
                    }
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
                    <h2>Pickup/Return information</h2>
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
                            return (<li key={index} onClick={()=> {getAvailableCars(vehVendorAvails, vCode)}}>{ vName } ({ vCode })</li>)
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
                        {
                            console.log("setArrAvailableCars", arrAvailableCars)
                        }
                        <main className="cards">
                            {
                                arrAvailableCars.map((car, index) => {
                                    return (
                                        <article className="card" key={index}>
                                            <img src={car.Vehicle.PictureURL} alt={car.Vehicle.VehMakeModel["@Name"]} title={car.Vehicle.VehMakeModel["@Name"]} />
                                            <div className="text">
                                                <h4>{car.Vehicle.VehMakeModel["@Name"]}</h4>
                                                <p><span className="title">Air Condition</span><span className="card-text">{(car.Vehicle["@AirConditionInd"]) ? "Available" : "UnAvailable"}</span>
                                                    <span className="title">Transmission Type</span><span className="card-text">{car.Vehicle["@TransmissionType"]}</span>
                                                    <span className="title">Fuel Type</span><span className="card-text">{car.Vehicle["@FuelType"]}</span>
                                                    <span className="title">Drive Type</span><span className="card-text">{car.Vehicle["@DriveType"]}</span>
                                                    <span className="title">Passenger Quantity</span><span className="card-text">{car.Vehicle["@PassengerQuantity"]}</span>
                                                    <span className="title">Baggage Quantity</span><span className="card-text">{car.Vehicle["@BaggageQuantity"]}</span>
                                                    </p>
                                            </div>
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
