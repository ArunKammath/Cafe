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
import { useSelector } from "react-redux";

ModuleRegistry.registerModules([
  AllCommunityModule
]);

function ReservationList() {
    const [reservations, setReservations] = useState([]);
    const userData = useSelector((state) => state.user.userData);
    const gridRef = useRef(null);

    useEffect(() => {
        async function fetchReservations() {
            try {
                const res = await axios.post("http://localhost:3000/reserveList", {userId: userData.userId});
                setReservations(res.data.reservations);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        }
        fetchReservations();
    }, [userData.userId]);
    const defaultColDef = useMemo(() => ({
        flex: 1
    }), []);

    const [columnDefs] = useState([
        { field: "reservationId", headerName: "Reservation ID"},
        { field: "reservationDate", headerName: "Reservation Date" },   
        { field: "reservationTime", headerName: "Reservation Time" },
        { field: "numGuests", headerName: "Number", flex:0.5 },
        { field: "occasion", headerName: "Occasion" },
    ]);
    const handleDelete = async () => {
        const selectedRow = gridRef.current?.api.getSelectedRows()[0];
        const filteredReservations = reservations.filter(r=>!(r.reservationDate === selectedRow.reservationDate && 
                                            r.reservationTime === selectedRow.reservationTime));
        setReservations(filteredReservations);
        const res = await axios.post("http://localhost:3000/ReservationList", selectedRow);
        alert(res.data.message);
    }
    return (
        <React.Fragment>
            <section id="myReservations">
                <RightTabLogin />
                <section id="reservationList">  
                    <div className="ag-theme-quartz" >
                        <AgGridReact 
                        ref={gridRef}
                        columnDefs={columnDefs} 
                        rowData={reservations} 
                        defaultColDef={defaultColDef}
                        rowSelection={'single'}
                        pagination={true} paginationPageSize={10} />
                    </div>
                    <button id="cancelReservation" onClick={handleDelete}>Cancel</button>
                </section>
            </section>
        </React.Fragment>
    );
}

export default ReservationList;