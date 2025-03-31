"use client";
import React, { useState, useEffect } from "react";
import Slots from "./Slots";
import styles from "../styles/bookingForm.module.css";
import Calendar from "./Calendar";
import Location from "./Location";
import Popup from "./popup";

export default function BookingForm({ doctor }) {
  const doctorId = doctor.id;
  const doctorLocation = doctor.address;

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };

  const [locationType, setLocationType] = useState("online");
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [morningRemaining, setMorningRemaining] = useState(8);
  const [eveningRemaining, setEveningRemaining] = useState(8);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleLocationTypeChange = (type) => {
    setLocationType(type);
  };

  const handleSlotSelect = (slot, shift) => {
    setSelectedSlot(slot);
    setSelectedShift(shift);
  };

  const morningSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM"
  ];

  const eveningSlots = [
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
  ];
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        console.log('selected date : ', selectedDate);

        const token = localStorage.getItem("token");
        const result = await fetch("http://localhost:3001/appointment/details",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              doc_id: parseInt(doctorId),
              appointment_date: selectedDate,
            }),
          }
        );

        if (!result.ok) {
          const errorData = await result.json();
          throw new Error(errorData.message || "Failed to fetch slots.");
        }

        const res = await result.json();
        if (res.success) {
          const bookedSlots = res.data
            .filter((item) => item.slot.split("T")[0] === selectedDate)
            .map((item) => new Date(item.slot).toLocaleTimeString([], 
              { hour: "2-digit", minute: "2-digit", hour12: true }).toUpperCase());

          setBookedSlots(bookedSlots);
          console.log('booked slots : ', bookedSlots);

          const bookedMorningSlots = bookedSlots.filter((slot) =>
            morningSlots.includes(slot)
          ).length;
          const bookedEveningSlots = bookedSlots.filter((slot) =>
            eveningSlots.includes(slot)
          ).length;

          setMorningRemaining(8 - bookedMorningSlots);
          setEveningRemaining(8 - bookedEveningSlots);
        }
      } catch (err) {
        console.error("Error fetching available slots:", err.message);
        toast.error("Error fetching available slots. Please try again.");
      }
    };

    fetchAvailableSlots();
  }, [doctorId, selectedDate]);

  const handleNext = async () => {
    if (!selectedSlot || !selectedShift) {
      alert("Please select a time slot.");
      return;
    }

    const userId = localStorage.getItem('userId');

    const appointmentData = {
      doctor_id: doctorId,
      user_id: userId,
      slot: `${selectedDate} ${selectedSlot}`,
      location_type: locationType,
      status: ""
    };

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/appointment/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      setPopupMessage("Wait for appointment confirmation on Mail!");
      setShowPopup(true);

    } catch (error) {
      console.error("Error booking appointment:", error);
      setPopupMessage(error.message || "Failed to book appointment.");
      setShowPopup(true);
    }
  };

  return (
    <div className={styles.bookingForm}>
      <Location location={doctorLocation} onLocationTypeChange={handleLocationTypeChange} />
      <Calendar onDateSelect={setSelectedDate} className={styles.calendar} />
      <Slots
        className={styles.slotContainer}
        shift="Morning"
        remaining_slots={morningRemaining}
        slots_array={morningSlots}
        booked_slots={bookedSlots}
        img_url={"/sun.png"}
        onSlotSelect={(slot) => handleSlotSelect(slot, "Morning")}
        selectedSlot={selectedShift === "Morning" ? selectedSlot : null}
      />
      <Slots
        className={styles.slotContainer}
        shift="Afternoon"
        remaining_slots={eveningRemaining}
        slots_array={eveningSlots}
        booked_slots={bookedSlots}
        img_url={"/sunset.png"}
        onSlotSelect={(slot) => handleSlotSelect(slot, "Afternoon")}
        selectedSlot={selectedShift === "Afternoon" ? selectedSlot : null}
      />
      <button className={styles.nextBtn} onClick={handleNext}>
        Book Appointment
      </button>
      {showPopup && <Popup message={popupMessage} redirecting_path={'/appointments'} />}
    </div>
  );
}
