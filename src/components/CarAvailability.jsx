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
            console.log('ar', ar);
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
        // console.log("vehVendorAvails", vehVendorAvails);
        let arrCA;
        if (vehVendorAvails && venCode === "All") {
            // console.log("venCode", venCode);
            arrCA =  vehVendorAvails.reduce(
                (arr, elem) => arr.concat(elem.VehAvails), []
            );
        }
        // } else {
        //     vehVendorAvails.filter((c) => {
        //         // console.log(c.VehAvails);
        //         if (c.Vendor["@Code"] === "125") {
        //             // console.log("c.VehAvails", c.VehAvails);
        //             return c.VehAvails;
        //         }
        //     })
        // }
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
                            return (<li key={index}>Vendor Name: { ven.Vendor["@Name"] }, { ven.Vendor["@Code"] }</li>)
                        })}
                            </ul>
                    {/* {console.log("vehVendorAvails", vehVendorAvails)} */}
                    </div>
                )
            }
            {
                vehVendorAvails && (
                    <div className="vehAvails">
                        <h2>Available Cars</h2>
                        {
                            console.log("setArrAvailableCars", arrAvailableCars)
                        }
                    </div>
                )
            }
           
        </>
    )
}
