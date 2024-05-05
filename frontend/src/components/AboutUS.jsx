import styles from './AboutUs.module.css'
function Aboutus(){
 return (
   <div className={`${styles.container1}`}>
     <div className={`${styles.headingcontainer}`}>
       <h1 className={`${styles.headingg}`}>About Us</h1>
     </div>
     <div>
       <p className={`${styles.para}`}>
         Welcome to Unlisted Stock Exchange, where we're dedicated to
         simplifying the process of buying and selling unlisted stocks. Our
         platform is designed to provide users with a seamless and secure
         experience, empowering both seasoned investors and newcomers alike to
         explore and engage with the exciting world of unlisted stocks. Join us
         as we revolutionize the way you invest, making it more accessible and
         transparent for everyone. Welcome to the future of investing with
         Unlisted Stock Exchange.
       </p>
     </div>
   </div>
 );
}
export default Aboutus;