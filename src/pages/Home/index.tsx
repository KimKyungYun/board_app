import styles from "./Home.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplayspeed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
  };

  return (
    <div className={styles.home}>
      <div className={styles.carousel}>
        <Slider {...settings} className={styles.carousel__slider}>
          <div className={styles.carousel__item}>

            <img
              src="https://cdn.pixabay.com/photo/2020/07/14/16/18/snow-5404785_960_720.jpg"
              alt=""
              className={styles.carousel__image}
            />
          </div>
          <div className={styles.carousel__item}>slide2</div>
          <div className={styles.carousel__item}>slide3</div>
          <div className={styles.carousel__item}>slide4</div>
        </Slider>
      </div>
      <div className={styles.home__text}></div>
      {/* <div className={styles.image}>2</div> */}
    </div>
  );
}
