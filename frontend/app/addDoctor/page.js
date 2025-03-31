"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputComponent from "@/components/Input_component";
import styles from "@/styles/addDoctor.module.css";
import Popup from "@/components/popup";

export default function DoctorForm() {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [YOE, setYOE] = useState("");
    const [picture_url, setPictureUrl] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [address, setAddress] = useState("");
    const [NOR, setNOR] = useState("");
    const [rating, setRating] = useState("");
    const [gender, setGender] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const router = useRouter();

    useEffect(() => {
        const role = localStorage.getItem("role"); 
        if (role !== "admin") {
            router.replace("/login");
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            name,
            title,
            YOE,
            picture_url,
            speciality,
            address,
            NOR,
            rating,
            gender,
        };

        try {
            const response = await fetch("http://localhost:3001/admin/doctors/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("All fields are required");

            setPopupMessage("Doctor added successfully !");
            setShowPopup(true);
        }
        catch (error) {
            setPopupMessage(error.message || "Failed to add Doctor.");
            setShowPopup(true);
        }
    };

    return (
        <div className={styles.mainContainer}>
            <form onSubmit={handleSubmit} className={styles.container}>
                <h2 className={styles.heading}>Add Doctor</h2>
                <section className={styles.section}>
                    <InputComponent
                        LabelName="Name"
                        color="rgba(28, 74, 42, 1)"
                        input_type="text"
                        img_url="./name.svg"
                        placeholder_name="Enter Doctor's Name"
                        value={name}
                        change={setName} 
                    />
                    <InputComponent
                        LabelName="Title (expertise)"
                        color="rgba(28, 74, 42, 1)"
                        input_type="text"
                        img_url="./Stethoscope.svg"
                        placeholder_name="Enter Doctor's Title"
                        value={title}
                        change={setTitle}
                    />
                    <InputComponent
                        LabelName="Years of Experience"
                        color="rgba(28, 74, 42, 1)"
                        input_type="number"
                        img_url="./age.svg"
                        placeholder_name="Enter YOE"
                        value={YOE}
                        change={setYOE}
                    />
                    <InputComponent
                        LabelName="Profile Picture URL"
                        color="rgba(28, 74, 42, 1)"
                        input_type="text"
                        img_url="./profile.svg"
                        placeholder_name="Enter Picture URL"
                        value={picture_url}
                        change={setPictureUrl}
                    />
                    <InputComponent
                        LabelName="Speciality"
                        color="rgba(28, 74, 42, 1)"
                        input_type="text"
                        img_url="/Stethoscope.svg"
                        placeholder_name="Enter Specialization"
                        value={speciality}
                        change={setSpeciality}
                    />
                    <InputComponent
                        LabelName="Address"
                        color="rgba(28, 74, 42, 1)"
                        input_type="text"
                        img_url="/name.svg"
                        placeholder_name="Enter Address"
                        value={address}
                        change={setAddress}
                    />
                    <InputComponent
                        LabelName="Number of Ratings"
                        color="rgba(28, 74, 42, 1)"
                        input_type="number"
                        img_url="/name.svg"
                        placeholder_name="Enter NOR"
                        value={NOR}
                        change={setNOR}
                    />
                    <InputComponent
                        LabelName="Rating (1-5)"
                        color="rgba(28, 74, 42, 1)"
                        input_type="number"
                        img_url="/name.svg"
                        placeholder_name="Enter Rating"
                        value={rating}
                        change={setRating}
                    />
                    <label className={styles.label}>
                        Gender:
                        <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)} className={styles.input} required>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                </section>

                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
            {showPopup && <Popup message={popupMessage} redirecting_path={'/doctor'} />}

        </div>
    );
}
