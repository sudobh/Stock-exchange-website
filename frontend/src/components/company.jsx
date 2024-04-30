/* eslint-disable jsx-a11y/anchor-is-valid */
import img2 from "../Data/img2.png";
import img3 from "../Data/img3.png";
import img4 from "../Data/img4.png";
import styles from './company.module.css'
function Company(){
return (
  <div className={`${styles.container1}`}>
    <h1>Company</h1>
    <hr />
    <div className={`${styles.container2}`}>
      <a href="#">
        <img
          src={img2}
          alt=" boat"
          width={150}
          height={200}
          className={`${styles.cimage}`}
        />
      </a>
      <a href="#">
        <img
          src={img3}
          alt="csk"
          width={150}
          height={200}
          className={`${styles.cimage}`}
        />
      </a>
      <a href="#">
        <img
          src={img4}
          alt="studds"
          width={150}
          height={200}
          className={`${styles.cimage}`}
        />
      </a>
    </div>
    <button className={`${styles.explore}`}>Explore More</button>
  </div>
);
}

export default Company;