import styles from './AboutUs.module.css';

function AboutUs() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.contentContainer}>
        <header className={styles.header}>
          <h1 className={styles.title}>About Us</h1>
          <div className={styles.underline}></div>
        </header>
        <div className={styles.textContent}>
          <p className={styles.description}>
            Welcome to Stock Exchange, where we're dedicated to simplifying the process 
            of buying and selling stocks. Our platform is designed to provide users with 
            a seamless and secure experience, empowering both seasoned investors and 
            newcomers alike to explore and engage with the exciting world of stocks.
          </p>
          <p className={styles.description}>
            Join us as we revolutionize the way you invest, making it more accessible 
            and transparent for everyone. Welcome to the future of investing with 
            Stock Exchange.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;