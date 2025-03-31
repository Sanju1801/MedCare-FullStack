"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/adminDashboard.module.css";
import Popup from "@/components/popup";

export default function AdminDashboard() {
    const router = useRouter();
        const [showPopup, setShowPopup] = useState(false);
        const [popupMessage, setPopupMessage] = useState(""); 

    useEffect(() => {
        const role = localStorage.getItem("role");
        const token = localStorage.getItem("token");
        if (!token || role !== "admin") {
            setPopupMessage("Unauthorized access. Redirecting to login...");
            setShowPopup(true);
            setTimeout(() => router.push("/login"), 2000);
            return;
        }
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Welcome to Admin Dashboard</h1>
            <div className={styles.buttonContainer}>
                <button
                    className={`${styles.button} ${styles.doctorButton}`}
                    onClick={() => router.push("/doctor")}
                >
                    Doctor
                </button>
                <button
                    className={`${styles.button} ${styles.appointmentButton}`}
                    onClick={() => router.push("/adminAppointments")}
                >
                    Appointment
                </button>
            </div>
            {showPopup && <Popup message={popupMessage} redirecting_path={'/login'} />}

        </div>
    );
}
