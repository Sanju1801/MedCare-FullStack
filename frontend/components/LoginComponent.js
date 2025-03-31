'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/login_signup.module.css";
import Input_component from "./Input_component";
import Button_component from "./Button_component";
import Link from "next/link";

const LOGIN_URL = "http://localhost:3001/login";
const FORGOT_PASSWORD_URL = "http://localhost:3001/password/forgot";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.stopPropagation();
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }
  
    try {
      const response = await fetch(LOGIN_URL, { 
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if(response.ok){

        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("role", data.user.role);
  
        if (data.user.role === "admin") {
          router.replace("/adminDashboard");
        } else {
          router.replace("/appointments");
        }
      }
      else {
        throw new Error(data.message || "Login failed");
      }
  
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/appointments");
    }
  }, []);

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:3001/google";
  };

  const isResetDisabled = !email && !password;

//*********** sent bcrypted password on mail *****************************/

  // const handleForgotPassword = async () => {
  //   if (!email) {
  //     setError("Please enter your email to reset your password.");
  //     return;
  //   }
    
  //   try {
  //     const response = await fetch(FORGOT_PASSWORD_URL, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email }),
  //     });
      
  //     if (response.ok) {
  //       setMessage("Password reset email sent successfully!");
  //     } else {
  //       throw new Error("Failed to send password reset email");
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  //********************************************************************* */
  
  return (
    <div className={styles.container} onClick={() => setError("")}>
      <div className={`${styles.fields} ${styles.loginFields}`}>
        <h6>Login</h6>
        <div className={styles.subtilte}>
          <span className={styles.p_tag}>
            Are you a new member? 
          </span>
          <span id={styles.signup_route}>
              <Link href="/signup">Sign up here.</Link>
          </span> 
        </div>
        
        {error && <p className={styles.error}>{error}</p>} 
        
        <section className={styles.section}>
          <Input_component
            LabelName="Email"
            color="rgba(28, 74, 42, 1)"
            input_type="email"
            img_url="./At sign.svg"
            value={email}
            change={setEmail}
            placeholder_name="example@123.com"
          />
          <Input_component
            LabelName="Password"
            color="rgba(28, 74, 42, 1)"
            input_type="password"
            value={password}
            img_url="./Lock.svg"
            change={setPassword}
            placeholder_name="Enter Your Password"
            isPasswordFlag = {true} 
          />
          <Button_component text="Login" color="#1C4A2A" onClick={handleLogin}/>
          <Button_component text="Google Signup" color="rgb(97, 180, 228)" onClick={handleGoogleSignup} />
          <Button_component
            text="Reset"
            color="#C6B09A"
            disabled={isResetDisabled}
            onClick={() => {
              setEmail("");
              setPassword("");
              setError(""); 
            }}
          />
          {/* <p className={styles.forgot} onClick={handleForgotPassword} style={{ cursor: "pointer" }}>Forgot Password?</p> */}
          </section>
      </div>
    </div>
  );
};

export default LoginComponent;
