import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/reservationDetails.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { RightTabLogin } from "./rightTabLogin";
import "../style/reservationList.css";
ModuleRegistry.registerModules([
  AllCommunityModule
]);

function ReservationList() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        async function fetchReservations() {
            try {
                const res = await axios.post("http://localhost:3000/reserveList");
                console.log(res.data);
                setReservations(res.data.reservations);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        }
        fetchReservations();
    }, []);
    console.log(reservations);
    const [columnDefs, setColumnDefs] = useState([
        { field: "reservationDate" },
        { field: "reservationTime" },
        { field: "numGuests" },
        { field: "occasion" },
    ]);
    return (
        <React.Fragment>
            <section id="reservationList">
                <RightTabLogin />
                <div className="ag-theme-quartz" >
                    <AgGridReact columnDefs={columnDefs} rowData={reservations} />
                </div>
            </section>
        </React.Fragment>
    );
}

export default ReservationList;