import React from "react";
import styles from "./Loading.module.scss";
import Spinner from "assets/Icon/loading_spinner.gif";
export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__text}>Loading</div>
      <img src={Spinner} alt="" className={styles.loading__img} />
    </div>
  );
}
