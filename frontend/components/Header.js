"use client";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../styles/header.module.css";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const checkToken = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoggedIn(false);
            setIsAdmin(false);
            return;
        }

        const role = localStorage.getItem("role");

        try {
            const payload = jwtDecode(token); 
            if (payload.exp * 1000 < Date.now()) {
                handleLogout(); 
            } else {
                setIsLoggedIn(true);
                setIsAdmin(role === 'admin');
            }
        } catch (error) {
            console.error("Invalid token:", error);
            handleLogout(); 
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setMenuOpen(false);
        router.push("/login");
    };

    useEffect(() => {
        checkToken();
      }, [pathname, menuOpen, isAdmin]);

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.leftContainer} >
                    {/* Logo */}
                    <div className={styles.logo}>
                        <Image className={styles.trust} alt="logo" src="/Trust.png" width={30} height={30} />
                        <h1>MedCare</h1>
                    </div>

                    {/* Nav bar links */}
                    {!isAdmin ? (<>
                        <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
                        <li className={pathname === '/' ? styles.active : ''}>
                            <Link href="/">Home</Link>
                        </li>
                        <li className={pathname === '/appointments' ? styles.active : ''}>
                            <Link href="/appointments">Appointments</Link>
                        </li>
                        <li className={pathname === '/contact' ? styles.active : ''}>
                            <Link href="/contact">Contact</Link>
                        </li>
                        <li className={pathname === '/reviews' ? styles.active : ''}>
                            <Link href="/">Reviews</Link>
                        </li>
                        {menuOpen && isLoggedIn && (
                            <li className={styles.mobileLogout}>
                                <button onClick={handleLogout} className={styles.logoutBtn}>
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                    </> ) : (<>
                        <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
                        <li className={pathname === '/adminDashboard' ? styles.active : ''}>
                            <Link href="/adminDashboard">Dashboard</Link>
                        </li>
                        <li className={pathname === '/adminAppointments' ? styles.active : ''}>
                            <Link href="/adminAppointments">Appointments</Link>
                        </li>
                        <li className={pathname === '/doctor' ? styles.active : ''}>
                            <Link href="/doctor">Doctors</Link>
                        </li>
                        <li className={pathname === '/contact' ? styles.active : ''}>
                            <Link href="/contact">Contact</Link>
                        </li>
                        {menuOpen && isLoggedIn && (
                            <li className={styles.mobileLogout}>
                                <button onClick={handleLogout} className={styles.logoutBtn}>
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                    </> )
}
                </div>

                {/* Hamburger Icon for small screens */}
                <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </div>

                <div className={styles.navBtns}>
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className={`${styles.btn} ${styles.logoutBtn}`}>
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link href="/login">
                                <button className={`
                                    ${styles.btn} 
                                    ${styles.loginBtn} 
                                    ${pathname === "/login" ? styles.activeBtn : styles.inactiveBtn}
                                    `}
                                >
                                    Login
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className={`
                                    ${styles.btn} 
                                    ${styles.registerBtn} 
                                    ${pathname === "/signup" ? styles.activeBtn : styles.inactiveBtn}
                                    `}
                                >
                                    Register
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
