import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import heroImage from '../assets/Data/img1.jpg';

function Hero() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status by looking for token in localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Background image container */}
      <div className={styles.heroBgContainer}>
        <img 
          src={heroImage} 
          alt="Stock market background" 
          className={styles.heroImage}
        />
      </div>
      
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.heroHeading}>
            Invest in Stocks with Confidence
          </h1>
          <h2 className={styles.heroSubheading}>
            Achieve Your Investment Goals With Us
          </h2>
          <p className={styles.heroDescription}>
            Investing in stocks can be daunting, but our platform makes it 
            simple and secure. Access exclusive pre-IPO opportunities, track your 
            portfolio with our intuitive dashboard, and make informed decisions 
            with our expert market insights.
          </p>
          <Link 
            to={isAuthenticated ? "/ShowMoreButton" : "/signup"} 
            className={styles.heroCta}
          >
            {isAuthenticated ? "Explore Investments" : "Start Investing Today"}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;