"use client"; 
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Popup from "@/components/popup";

export default function AuthSuccess() {
    const router = useRouter();
    const [isToken, setIsToken] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");

            if (token) {
                localStorage.setItem("token", token);
                setIsToken(true);
                setMessage('Authenticating...');
                router.replace("/appointments");
            } else {
                setMessage('Please log in with email and password.');
            }
        }
    }, []);

    return (
        <Popup message={message} redirecting_path={isToken ? "/appointments" : "/login" }/>
    );
}