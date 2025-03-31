'use client'
import React, { useEffect, useState } from "react";
import styles from "@/styles/appointment.module.css";
import Footer from "@/components/Footer";
import Search from "@/components/Search";
import Filter from "@/components/Filter";
import Doctor_card from "@/components/Doctor_card";
import Pagination from "@/components/Pagination";
import CheckAuth from "@/components/CheckAuth";

export default function Appointment() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({ rating: "all", experience: "all", gender: "all", searchQuery: "" });
    const [totalPages, setTotalPages] = useState(1);
    const [totalDoctors, setTotalDoctors] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    useEffect(() => {
        const fetchDoctors = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams();
                if (filters.searchQuery) queryParams.append("searchQuery", filters.searchQuery);
                if (!filters.rating || filters.rating === "Show all") filters.rating = 'all';
                if (!filters.experience || filters.experience === "Show all") filters.experience = 'all';
                if (filters.experience === "15+") filters.experience = '16';
                if (!filters.gender || filters.gender === "Show all") filters.gender = 'all';

                queryParams.append("rating", filters.rating);
                queryParams.append("experience", filters.experience);
                queryParams.append("gender", filters.gender);
                queryParams.append("page", currentPage);
                queryParams.append("perPage", itemsPerPage);

                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:3001/doctors/filter?${queryParams.toString()}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await response.json();
                if (Array.isArray(data.doctors)) {
                    setDoctors(data.doctors);
                }

                setTotalPages(Math.ceil(data.total / itemsPerPage));
                setTotalDoctors(data.total);
                                console.log('doctors in fetch : ',doctors);

            } 
            catch (error) {
                console.error("Error fetching doctors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, [filters, currentPage]); 

    return (
        <>
            <CheckAuth />
            <div className={styles.mainContainer}>
                <Search filters={filters} setFilters={handleFilterChange} />
                <div className={styles.title}>
                    <h1>{totalDoctors} doctors available</h1>
                    <p>Book appointment with minimum wait-time & verified doctor details</p>
                </div>
                <div className={styles.subContainer}>
                    <div className={styles.filterContainer}>
                        <Filter filters={filters} setFilters={handleFilterChange} />
                    </div>
                    <div className={styles.doctorsContainer}>
                        {loading ? (
                            <p>Loading doctors...</p>
                        ) : (
                            doctors.map((doctor, index) => (
                                <Doctor_card key={index} doctor={doctor} className={styles.card} />
                            ))
                        )}
                    </div>
                </div>
                <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={setCurrentPage} 
                />
                <Footer />
            </div>
        </>
    );
}
