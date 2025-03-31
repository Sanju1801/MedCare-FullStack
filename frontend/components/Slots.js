"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import styles from "../styles/slots.module.css";

export default function Slots({
    img_url,
    shift,
    remaining_slots,
    slots_array,
    booked_slots,
    selectedSlot,
    onSlotSelect,
  }) {

    const slotContainerRef = useRef(null);

    const handleSlotClick = (time) => {
        if (!booked_slots.includes(time)) {
            onSlotSelect(time);
        }
        console.log("booked_slots in alot component :", booked_slots);
    };

    const scrollLeft = () => {
        slotContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    };

    const scrollRight = () => {
        slotContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    };

    return (
        <div className={styles.container}>
            <div className={styles.head}>
            <button className={`${styles.scrollButton} ${styles.left}`} onClick={scrollLeft}>‹</button>

                <div className={styles.dayTime}>
                    <Image src={img_url} className={styles.sunset} alt="day-shift" width={20} height={10} />
                    <span className={styles.shift}>{shift}</span>
                </div>
                <span className={styles.slotCount}>{remaining_slots} Slots</span>
                <button className={`${styles.scrollButton} ${styles.right}`} onClick={scrollRight}>›</button>

            </div>

            <div className={styles.slotContainer} ref={slotContainerRef}>
                {slots_array.map((time) => {
                    const isBooked = booked_slots.includes(time);
                    return (
                        <div
                            key={time}
                            role="button"
                            className={isBooked ? styles.slotDisabled : selectedSlot === time ? styles.slotClicked : styles.slot}
                            onClick={() => handleSlotClick(time)}
                        >
                            {time}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

