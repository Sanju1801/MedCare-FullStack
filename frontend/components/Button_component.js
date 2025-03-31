"use client"
import React from "react";
import styles from "../styles/button.module.css";

const Button_component = ({ text, color, onClick}) => {

  return (
    <div
      className={styles.container}
      role="button"
      tabIndex={0}
      style={{ backgroundColor: color }} 
      onClick={onClick}
    >
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Button_component;
