/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from './company.module.css'
import ShowMoreButton from './showMore';
function Company(){
return (
  <div className={`${styles.container1}`}>
    <h1 className={`${styles.heading}`}>Company</h1>
    <hr className={`${styles.line}`} />
    <div className={`${styles.container2}`}>
      <a href="#">
        <img
          src="img2.png"
          alt=" boat"
          width={150}
          height={200}
          className={`${styles.cimage}`}
        />
      </a>
      <a href="#">
        <img
          src="img3.png"
          alt="csk"
          width={150}
          height={200}
          className={`${styles.cimage}`}
        />
      </a>
      <a href="#">
        <img
          src="img4.png"
          alt="studds"
          width={150}
          height={200}
          className={`${styles.cimage}`}
        />
      </a>
    </div>
    <ShowMoreButton />
    <hr />
  </div>
);
}

export default Company;