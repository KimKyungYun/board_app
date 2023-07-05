import { useState } from "react";
import styles from "../Post.module.scss";
export default function Preview() {
  const [imgName, setImgName]: any = useState(null);

  const onUpload = (e: any) => {
    console.log(e.target.files[0]);

    setImgName(e.target.files);
  };

  return (
    <div className={styles["form__content--preview"]}>
      <input
        accept="image/*"
        multiple
        type="file"
        onChange={(e) => onUpload(e)}
      />
    </div>
  );
}
