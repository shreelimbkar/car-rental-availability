import React, {useEffect, useState} from 'react'

export default function CarAvailability() {

    const [cars, setCars] = useState(null);

    useEffect(() => {
        async function getCarsData() {
            const response = await fetch("http://www.cartrawler.com/ctabe/cars.json");
            const data = await response.json();
            console.log("data", data[0].VehAvailRSCore)
            setCars(data[0].VehAvailRSCore);
            // {cars.VehAvailRSCore.VehRentalCore["@PickUpDateTime"]}
        }
        getCarsData();
    }, []);

    return (
        <>
            {
                <h1>CarAvailability: </h1>
                 
            }
           
        </>
    )
}
