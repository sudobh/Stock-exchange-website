/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "./company.module.css";
import ShowMoreButton from "./showMore";
function Company() {
  const Cdata = [
    {
      cname: "boat",
      cimg: "img2.png",
      cap: "Market Cap(in cr.): ₹ 12,334",
      price: "Current Price: ₹ 400",
    },
    {
      cname: "studds",
      cimg: "img4.png",
      cap: "Market Cap(in cr.): ₹ 11,334",
      price: "Current Price: ₹ 200",
    },
    {
      cname: "csk",
      cimg: "img3.png",
      cap: "Market Cap(in cr.): ₹ 102,334",
      price: "Current Price: ₹ 1400",
    },
  ];
  return (
    <div className={`${styles.container1}`}>
      <h1 className={`${styles.heading}`}>Company</h1>
      <hr className={`${styles.line}`} />
      <div className={`${styles.outercontainer}`}>
          {Cdata.map((data) => (
            <div className={`${styles.innercontainer}`}>
              <div className={`${styles.imagecontainer}`}>
                <img
                  src={data.cimg}
                  alt={data.cname}
                  className={`${styles.image}`}
                />
              </div>
              <div>
                <p>
                  <h6 className={`${styles.valuecontainer}`}>{data.cap}</h6>
                  <h6 className={`${styles.valuecontainer}`}>{data.price}</h6>
                </p>
              </div>
              <div>
                <button
                  type="button"
                  className={` ${styles.buy} btn btn-success`}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
      </div>
      <ShowMoreButton />
      <hr />
    </div>
  );
}

export default Company;
