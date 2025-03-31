"use client";
import React from "react";
import styles from "@/styles/contact.module.css";

export default function EmergencyContact() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>🚑 Emergency Contacts</h2>
      <p className={styles.description}>
        Quick access to emergency medical assistance.
      </p>

      <div className={styles.card}>
        <span className={styles.text}>Ambulance</span>
        <span className={styles.number}>102</span>
      </div>

      <div className={styles.card}>
        <span className={styles.text}>Police</span>
        <span className={styles.number}>112</span>
      </div>

      <div className={styles.card}>
        <span className={styles.text}>Emergency Support</span>
        <span className={styles.number}>9188-664-421</span>
      </div>
    </div>
  );
}
