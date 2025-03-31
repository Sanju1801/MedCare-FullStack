"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/doctor.module.css"; 
import Link from "next/link";
import Popup from "@/components/popup";

export default function Doctor() {
    const [doctors, setDoctors] = useState([]);
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState(""); 

    useEffect(() => {
        checkAdminAuth(); 
    }, []);

    const checkAdminAuth = () => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "admin") {
            setPopupMessage("Unauthorized access. Redirecting to login...");
            setShowPopup(true);
            setTimeout(() => router.push("/login"), 2000);
            return;
        }

        fetchDoctors(token); 
    };

    const fetchDoctors = async (token) => {
        try {
            const response = await fetch("http://localhost:3001/admin/doctors", {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.status === 401) throw new Error("Unauthorized access.");
            if (!response.ok) throw new Error("Failed to fetch doctors");

            const res = await response.json();
            setDoctors(res.data);
        } catch (error) {
            setPopupMessage(error.message || "Failed to Fetch Doctors.");
            setShowPopup(true);
            setTimeout(() => router.push("/login"), 2000);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this doctor?")) return;

        try {
            const response = await fetch(`http://localhost:3001/admin/doctors/delete/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete doctor");

            setDoctors(doctors.filter((doctor) => doctor.id !== id));
            setPopupMessage("Doctor deleted successfully !");
            setShowPopup(true);

        } catch (error) {
            setPopupMessage(error.message || "Failed to delete doctor.");
            setShowPopup(true);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Doctor Management</h1>
                <button className={styles.addButton} onClick={() => router.push("/addDoctor")}>
                    Add Doctor
                </button>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Specialization</th>
                        <th>Experience (years)</th>
                        <th>Address</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor.id}>
             <td>
                                    <Link href={`/appointments/${doctor.id}`} className={styles.doctorLink}>
                                        {doctor.id}
                                    </Link>
                                </td>
                            <td><img src={doctor.picture_url || '/doctor.png'} alt={doctor.name} className={styles.doctorImage} /></td>
                            <td>{doctor.name}</td>
                            <td>{doctor.title}</td>
                            <td>{doctor.yoe}</td>
                            <td>{doctor.address}</td>
                            <td>{doctor.nor}</td>
                            <td>{doctor.rating} ⭐</td>
                            <td>
                                <button className={styles.deleteButton} onClick={() => handleDelete(doctor.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showPopup && <Popup message={popupMessage} redirecting_path={'/doctor'} />}

        </div>
    );
}
