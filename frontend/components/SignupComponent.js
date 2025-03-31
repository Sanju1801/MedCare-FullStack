'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputComponent from "./Input_component";
import Button_component from "./Button_component";
import styles from '../styles/login_signup.module.css';
import Link from "next/link";

const URL = "http://localhost:3001/signup";

const SignupComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.stopPropagation();

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if(response.ok){
        localStorage.setItem("token", data.token);
        console.log("Token:", data.token);

        router.replace("/appointments");
      }
      else {
        throw new Error(data.message || "Signup failed");
      }


    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:3001/google";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/appointments"); 
    }
  }, []);

  const isResetDisabled = !name && !email && !password;

  return (
    <div className={styles.container} onClick={() => setError("")}>

      <div className={`${styles.fields} ${styles.signupFields}`}>

        <h6>Sign Up</h6>
        <div className={styles.subtilte}>
          <span className={styles.p_tag}>Already a member?</span>
          <span id={styles.signup_route}>
            <Link href="/login">Login here.</Link>
          </span>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <section className={styles.section}>
          <InputComponent
            LabelName="Name"
            color="rgba(28, 74, 42, 1)"
            value={name} 
            change={setName}
            img_url="./name.svg"
            placeholder_name="Enter Your Name"
          />
          <InputComponent
            LabelName="Email"
            color="rgba(28, 74, 42, 1)"
            value={email} 
            change={setEmail}
            img_url="./At sign.svg"
            placeholder_name="example@123.com"
          />
          <InputComponent
            LabelName="Password"
            color="rgba(28, 74, 42, 1)"
            value={password} 
            change={setPassword}
            img_url="./Lock.svg"
            placeholder_name="Enter Your Password"
            isPasswordFlag={true}
          />
          <Button_component text="Sign Up" color="#1C4A2A" onClick={handleSignup} />
          <Button_component text="Google Signup" color="rgb(97, 180, 228)" onClick={handleGoogleSignup} />
          <Button_component text="Reset" color="#C6B09A" 
            disabled={isResetDisabled}
            onClick={() => { 
              setName(""); 
              setEmail(""); 
              setPassword(""); 
              setError(""); 
            }} 
          />
        </section>

      </div>
    </div>
  );
};

export default SignupComponent;
