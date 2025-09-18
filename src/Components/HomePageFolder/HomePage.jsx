import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.homePageContainer}>
      <div className={styles.descrip}>
        <h1 className={styles.heading}>About Us!</h1>
        We are a locally sourced shop that sells second hand clothing thats just
        as good as NEW!!! We hope You like are selection of Products Thanks for
        Shoping with us.
      </div>
      <div className={styles.styleDiv1}></div>
      <div className={styles.styleDiv2}></div>
    </div>
  );
}
