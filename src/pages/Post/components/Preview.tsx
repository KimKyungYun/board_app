import { useState } from "react";
import styles from "../Post.module.scss";
export default function Preview() {
  return (
    <div className={styles["form__content--preview"]}>
      <input accept="image/*" multiple type="file" />
    </div>
  );
}
