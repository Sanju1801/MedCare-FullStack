"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import styles from "@/styles/profile.module.css";
import Review from "@/components/Review";

export default function Profile() {
    const router = useRouter();
    const { id } = useParams();

    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviewOpen, setReviewOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem('role');
        console.log("token : ", token);
        if (!token) {
            router.push("/login");
            return;
        }
        if(role === 'admin'){
            setIsAdmin(true);
        }
        fetchDoctorData(id, token);
    }, [id]);

    const fetchDoctorData = async (doctorId, token) => {
        try {
            const res = await fetch(`http://localhost:3001/doctors/profile/${doctorId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error("Failed to fetch doctor data");

            const result = await res.json();
            setDoctor(result.data);
        }
        catch (error) {
            console.error(error.message);
            router.push("/login");
        } finally {
            setLoading(false);
        }
    };

    const handleReview = () => {
        setReviewOpen(true);
    }

    if (loading) return <h1>Loading...</h1>;
    if (!doctor) return <h1>User not logged in. Redirecting...</h1>


    return (
        <div className={styles.profileContainer}>
            <div className={styles.card}>
                <img
                    src={doctor.picture_url || "/doctor.png"}
                    alt="doctor pic"
                    width={120}
                    height={120}
                    className={styles.profilePic}
                />
                <div className={styles.info}>
                    <h2 className={styles.name}>{doctor.name}</h2>
                    <p className={styles.specialty}><strong>Specialty:</strong> {doctor.title}</p>
                    <p className={styles.experience}><strong>Experience:</strong> {doctor.yoe} Years</p>
                    <p className={styles.location}><strong>Location:</strong> {doctor.address || "Not Available"}</p>

                    <div className={styles.rating}>
                        <span className={styles.ratingText}><strong>Ratings:</strong></span>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Image
                                key={i}
                                src={i < doctor.rating ? "/filled_star.svg" : "/empty_star.svg"}
                                alt="Star icon"
                                width={16}
                                height={16}
                                className={styles.star}
                            />
                        ))}
                    </div>

                </div>
            </div>

            <hr className={styles.line} />
            <div className={styles.availability}>
                <h3>Availability Times:</h3>
                <ul>
                    {doctor.gender === "male" ? (
                        <>
                            <li>Monday-Wednesday: 9:00 AM to 01:00 PM</li>
                            <li>Thursday-Saturday: 3:00 PM to 07:00 PM</li>
                        </>
                    ) : (
                        <>
                            <li>Monday-Wednesday: 9:00 AM to 01:00 PM</li>
                            <li>Friday-Sunday: 3:00 PM to 07:00 PM</li>
                        </>
                    )}
                </ul>

                {!isAdmin &&
                <div className={styles.btnContainer}>
                    <button
                        className={styles.bookBtn}
                        onClick={() => router.push(`/appointments/${doctor.id}/booking`)}
                    >
                        Book Appointment
                    </button>

                    <button
                        className={styles.addReviewBtn}
                        onClick={handleReview}
                    >
                        Add Review
                    </button>
                </div>
                }
            </div>
            {reviewOpen && <Review doctorId={id} onClose={() => setReviewOpen(false)} setReviewOpen={setReviewOpen}/>}
            </div>
    );
}