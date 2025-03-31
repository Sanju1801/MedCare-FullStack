import React from 'react'
import LoginComponent from '@/components/LoginComponent'
import styles from "@/styles/login_signup.module.css";

const Login = () => {
  return (
    <div className={`${styles.mainContainer} ${styles.loginContainer}`}>
      <LoginComponent/>
    </div>
  )
}

export default Login
