"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/styles/adminAppointments.module.css";
import Popup from "@/components/popup";

export default function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState(""); 
    const router = useRouter();

    useEffect(() => {
        const role = localStorage.getItem("role"); 
        if (role !== "admin") {
            router.replace("/login");
            return;
        }
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await fetch("http://localhost:3001/admin/appointments");
            
            if (!response.ok) throw new Error("Failed to fetch appointments");
            
            const res = await response.json();
            setAppointments(res.data);
            console.log(res.data)

        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    const updateAppointmentStatus = async (id, status) => {
        try {
            const response = await fetch("http://localhost:3001/admin/appointments/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, status }),
            });

            if (!response.ok) throw new Error("Failed to update appointment status");

            setAppointments((prevAppointments) =>
                prevAppointments.filter((appointment) => appointment.id !== id)
            );
            setPopupMessage("Appointment status updated !");
            setShowPopup(true);

        } catch (error) {
            setPopupMessage(error.message || "Failed to book appointment.");
            setShowPopup(true);
        }
    };

    const formatTime = (isoString) => {
        const date = new Date(isoString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0"); 
    
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0"); 
        const ampm = hours >= 12 ? "PM" : "AM";
    
        hours = hours % 12 || 12; 
    
        return `${year}-${month}-${day} | ${hours}:${minutes} ${ampm}`;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Appointments Management</h1>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Doctor</th>
                        <th>User</th>
                        <th>Location</th>
                        <th>Slot Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length === 0 ? (
                        <tr>
                            <td colSpan="6" className={styles.noAppointments}>
                                No pending appointments
                            </td>
                        </tr>
                    ) : (
                        appointments.map((appointment) => (
                            <tr key={appointment.id}>
                            <td>{appointment.id}</td>
                                <td>
                                    <Link href={`/appointments/${appointment.doctor_id}`} className={styles.doctorLink}>
                                        {appointment.doctor_name}
                                    </Link>
                                </td>
                                <td>{appointment.user_name}</td>
                                <td>{appointment.location_type}</td>
                                <td>{formatTime(appointment.slot)}</td>
                                <td className={styles.actionButtons}>
                                    <button
                                        className={styles.approveButton}
                                        onClick={() => updateAppointmentStatus(appointment.id, "approved")}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className={styles.declineButton}
                                        onClick={() => updateAppointmentStatus(appointment.id, "declined")}
                                    >
                                        Decline
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {showPopup && <Popup message={popupMessage} redirecting_path={'/adminAppointments'} />}
        </div>
    );
}
