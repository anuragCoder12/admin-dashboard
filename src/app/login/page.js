import React from 'react'
import styles from "./login.module.css";
function Login() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input type="text" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  )
}

export default Login