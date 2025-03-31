"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/popup.module.css"; 

function CheckAuth() {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        router.push("/login"); 
      }, 2000);
    }
  }, [router]);

  return (
    <>
      {showPopup && (
        <div className={styles.container}>
          <div className={styles.popup}>
            <p>User not logged in! Redirecting to login...</p>
          </div>
        </div>
      )}
    </>
  );
}

export default CheckAuth;
