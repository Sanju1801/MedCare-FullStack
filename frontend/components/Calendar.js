'use client';
import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/calendar.module.css";

export default function Calendar({ onDateSelect }) {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today.toISOString().split("T")[0]);
    const dateContainerRef = useRef(null);

    const dates = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() + i);
        return {
            day: date.toLocaleDateString("en-US", { weekday: "short" }),
            date: date.toLocaleDateString("en-US", { day: "2-digit", month: "short" }),
            fullDate: date.toISOString().split("T")[0],
        };
    });

    useEffect(() => {
            onDateSelect(selectedDate); 
        }, []);
    
        const scrollLeft = () => {
            if (dateContainerRef.current) {
                dateContainerRef.current.scrollBy({ left: -100, behavior: "smooth" });
            }
        };
    
        const scrollRight = () => {
            if (dateContainerRef.current) {
                dateContainerRef.current.scrollBy({ left: 100, behavior: "smooth" });
            }
        };

    return (
        <div className={styles.container}>

            <div className={styles.month}>
                <span className={styles.monthTitle}>
                {new Date(selectedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
            </div>

            <div className={styles.dateWrapper}>
                <button className={styles.navButton} onClick={scrollLeft}>‹</button>

                <div className={styles.dateContainer} ref={dateContainerRef}>
                    {dates.map(({ day, date, fullDate }) => (
                        <div
                            key={fullDate}
                            className={`${styles.dateItem} ${selectedDate === fullDate ? styles.selected : ""}`}
                            onClick={() => {
                                setSelectedDate(fullDate);
                                onDateSelect(fullDate);
                            }}
                        >
                            <p className={styles.day}>{day}</p>
                            <p className={styles.date}>{date}</p>
                        </div>
                    ))}
                </div>

                <button className={styles.navButton} onClick={scrollRight}>›</button>

            </div>
        </div>
    );
};
