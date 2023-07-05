import styles from "./Home.module.scss";
import Sunlight from "assets/Icon/sunlight.jpg";
export default function Home() {
  return (
    <div className={styles.home}>
      <img src={Sunlight} alt="" className={styles["first-background"]} />
    </div>
  );
}
