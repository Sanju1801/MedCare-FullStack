import React from 'react'
import SignupComponent from '@/components/SignupComponent'
import styles from '@/styles/login_signup.module.css'


const Login = () => {
  return (
    <div className={`${styles.mainContainer} ${styles.signupContainer}`}>
      <SignupComponent/>
    </div>
  )
}

export default Login

