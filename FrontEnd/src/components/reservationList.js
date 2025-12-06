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
import { useMemo } from "react";

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
    const defaultColDef = useMemo(() => ({
        flex: 1
    }), []);

    const [columnDefs, setColumnDefs] = useState([
        { field: "reservationDate", headerName: "Reservation Date" },   
        { field: "reservationTime", headerName: "Reservation Time" },
        { field: "numGuests", headerName: "Number of Guests" },
        { field: "occasion", headerName: "Occasion" },
    ]);
    return (
        <React.Fragment>
            <section id="reservationList">
                <RightTabLogin />
                <div className="ag-theme-quartz" >
                    <AgGridReact columnDefs={columnDefs} rowData={reservations} defaultColDef={defaultColDef}
                    pagination={true} paginationPageSize={10} />
                </div>
            </section>
        </React.Fragment>
    );
}

export default ReservationList;