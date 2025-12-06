import axios from "axios";
import React, { useEffect, useState, useMemo, useRef } from "react";
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
    const gridRef = useRef(null);

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

    const [columnDefs] = useState([
        { field: "reservationDate", headerName: "Reservation Date" },   
        { field: "reservationTime", headerName: "Reservation Time" },
        { field: "numGuests", headerName: "Number of Guests" },
        { field: "occasion", headerName: "Occasion" },
    ]);
    const handleDelete = async () => {
        const selectedRow = gridRef.current?.api.getSelectedRows()[0];
        console.log(selectedRow);
        const filteredReservations = reservations.filter(r=>!(r.reservationDate === selectedRow.reservationDate && 
                                            r.reservationTime === selectedRow.reservationTime));
        setReservations(filteredReservations);
        const res = await axios.post("http://localhost:3000/ReservationList", selectedRow);
        console.log(res.data);
    }
    return (
        <React.Fragment>
            <section id="reservationList">
                <RightTabLogin />
                <button id="cancelReservation" onClick={handleDelete}>Cancel</button>
                <div className="ag-theme-quartz" >
                    <AgGridReact 
                    ref={gridRef}
                    columnDefs={columnDefs} 
                    rowData={reservations} 
                    defaultColDef={defaultColDef}
                    rowSelection={'single'}
                    pagination={true} paginationPageSize={10} />
                </div>

            </section>
        </React.Fragment>
    );
}

export default ReservationList;