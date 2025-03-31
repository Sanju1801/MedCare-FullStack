"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import styles from "@/styles/bookingHome.module.css";
import CheckAuth from "@/components/CheckAuth";

export default function Booking() {
  const { id } = useParams(); 
  const router = useRouter();
  const doctorId = parseInt(id, 10);

  console.log("Doctor ID:", doctorId);

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (doctorId) {
      
      fetchDoctorData(doctorId);
    }
  }, [doctorId]);

  const fetchDoctorData = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem('role');

      if(role && role === 'admin'){
        router.push("/adminDashboard");
        return;
      }
      const res = await fetch(`http://localhost:3001/doctors/profile/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (res.status === 404) {
        console.error("Doctor not found, redirecting...");
        router.push("/login");
        return;
      }

      if (!res.ok) throw new Error("Failed to fetch doctor data");

      const result = await res.json();
      console.log("Fetched data:", result.data);
      setDoctor(result.data);
    } 
    catch (error) {
      console.error("Error fetching doctor details:", error);
      router.push("/login"); 
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!doctor) return <p >User is not authenticated. Redirecting...</p>;

  return (
    <div>
      <CheckAuth />
      <div className={styles.mainContainer}>
        {/* Left Section */}
        <div className={styles.leftContainer}>
          <div className={styles.titleContainer}>
            <h1>Book Your Next Doctor Visit in Seconds.</h1>
            <p>
              CareMate helps you find the best healthcare provider by speciality, location, and more, 
              ensuring you get the care you need.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.rightContainer}>
          <BookingForm doctor={doctor} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
