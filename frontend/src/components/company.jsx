import React from 'react';
import styles from './company.module.css';
import ShowMoreButton from './showMore';
import { companyData } from '../assets/companyData.js';
function Company() {
 

  return (
    <section className={styles.companySection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Featured Companies</h2>
        <p className={styles.sectionSubtitle}>Invest in high-growth unlisted companies</p>
      </div>
      
      <div className={styles.companiesGrid}>
        {companyData.slice(0, 3).map((company) => (
          <div className={styles.companyCard} key={company.id}>
            <div className={styles.companyLogo}>
              <img
                src={company.companyLogo}
                alt={company.companyName}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/company-placeholder.png';
                }}
              />
            </div>
            <div className={styles.companyInfo}>
              <h3 className={styles.companyName}>{company.companyName}</h3>
              <div className={styles.companyDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Market marketCapitalisation</span>
                  <span className={styles.detailValue}>₹{company.marketCapitalisation} cr</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Current stockPrice</span>
                  <span className={styles.detailValue}>₹{company.stockPrice}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>P/E Ratio</span>
                  <span className={styles.detailValue}>{company.peRatio}</span>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
      
      <ShowMoreButton />
    </section>
  );
}

export default Company;