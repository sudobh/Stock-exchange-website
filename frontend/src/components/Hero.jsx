import img1 from "../assets/Data/img1.jpg";
import styles from './Hero.module.css'
function Heroo(){
return (
  <div>
    <div>
      <img src={img1} alt="stock" className={`${styles.heroimg}`} />
    </div>
    <div className={`${styles.container1}`}>
      <span className={`${styles.container2}`}>
        <h1 className={`${styles.heading1}`}>Invest in Unlisted Stocks</h1>
      </span>
      <span className={`${styles.container3}`}>
        <h6 className={`${styles.heading2}`}>
          {" "}
          Achieve Your Investment Goals With Us
        </h6>
        <p className={`${styles.para}`}>
          Investing in the stock market can be daunting, but our platform at
          Unlisted Stocks makes it easy for you to buy and sell unlisted stocks.
          Our user-friendly dashboard allows you to track your purchases and
          make informed decisions. Let us help you achieve your investment
          goals.
        </p>
      </span>
    </div>
  </div>
);
}
export default Heroo;