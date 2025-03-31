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
        <span className={styles.number}>911</span>
      </div>

      <div className={styles.card}>
        <span className={styles.text}>Medical Helpline</span>
        <span className={styles.number}>+1 800-555-1234</span>
      </div>

      <div className={styles.card}>
        <span className={styles.text}>Emergency Support</span>
        <span className={styles.number}>+1 800-555-5678</span>
      </div>
    </div>
  );
}
