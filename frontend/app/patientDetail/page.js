'use client'
import react, { useState } from "react";
import InputComponent from "@/components/Input_component";
import styles from '@/styles/test.module.css';

export default function test() {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        problem: "",
        healthInfo: ""
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Patient Data Submitted:", formData);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <h2 className={styles.heading}>Enter Details:</h2>
            <section className={styles.section}>
                <InputComponent
                    LabelName="Name"
                    color="rgba(28, 74, 42, 1)"
                    input_type="text"
                    img_url="./name.svg"
                    placeholder_name="Enter Your Name"
                />
                <InputComponent
                    LabelName="Email"
                    color="rgba(28, 74, 42, 1)"
                    input_type="email"
                    img_url="./At sign.svg"
                    placeholder_name="example@123.com"
                />
                <InputComponent
                    LabelName="Age"
                    color="rgba(28, 74, 42, 1)"
                    input_type="number"
                    img_url="/age.svg"
                    placeholder_name="Enter Your Age"
                />

                <label className={styles.label}>
                    Gender:
                    <select name="gender" value={formData.gender} onChange={handleChange} className={styles.input} required>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <InputComponent
                    LabelName="Problem"
                    color="rgba(28, 74, 42, 1)"
                    input_type="text"
                    img_url="/virus.svg"
                    placeholder_name="Enter Health Problem"
                />
            </section>

            <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
    );
}