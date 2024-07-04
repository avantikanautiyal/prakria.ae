import React from "react";
import styles from "@/styles/loader.module.css";

function Loading() {
  return (
    <div className={styles?.["smart-glass"]}>
      <h1></h1>
      <div className={styles.logo}>
        <div className={styles.circle}>
          <div className={styles.circle}>
            <div className={styles.circle}></div>
          </div>
        </div>
        <div className={styles?.["hold-x"]}>
          <div className={styles?.["xbox"]}></div>
        </div>
      </div>
      <div className={styles?.["loading-text"]}>Loading...</div>
    </div>
  );
}

export default Loading;
