"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/popup.module.css"; 

function Popup ({ redirecting_path,  message }) {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShowPopup(true); 

    const timer = setTimeout(() => {
      setShowPopup(false); 
      router.push(redirecting_path); 
    }, 2500);

    return () => clearTimeout(timer);
  }, [redirecting_path, router]);

  return (
    <>
      {showPopup && (
        <div className={styles.container}>
          <div className={styles.popup}>
            <p>{message}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Popup;
