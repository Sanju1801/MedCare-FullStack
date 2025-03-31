'use client'
import styles from '@/styles/review.module.css';
import React, { useState } from 'react';

export default function Review( { doctorId,onClose, setReviewOpen }) {
        const [rating, setRating] = useState(1);
    const [review, setReview] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        console.log("user id :" ,userId);
        const reviewData = { review, rating, doctorId, userId };
        
        try {
            const response = await fetch('http://localhost:3001/doctors/review', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(reviewData),
            });

            if (!response.ok) throw new Error('Failed to submit review');

            setMessage('Review submitted successfully!');
            setReviewOpen(setTimeout(() => {
                setReviewOpen(false);
              }, 2000));
              
            setRating(1);
            setReview('');
        } 
        catch (error) {
            setMessage(error.message || 'Error submitting review');
        }
    };

    return (
        <div className={styles.container} onClick={()=>{setMessage('')}}>
          <div className={styles.popup}>
          <div className={styles.header}>
                <h2 className={styles.title}>Add a Review</h2>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
            </div>
                <select
                    className={styles.select}
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                >
                    <option value="">Select Rating</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                </select>
                <textarea
                    className={styles.textarea}
                    placeholder="Write your review..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                <button className={styles.button} onClick={handleSubmit}>
                    Submit
                </button>
                {message && <p className={styles.message}>{message}</p>}
                </div>
        </div>
    );
}