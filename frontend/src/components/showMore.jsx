import React from 'react';
import { Link } from 'react-router-dom';
import styles from './company.module.css';
import { ChevronRight } from 'react-bootstrap-icons'; // Or use an alternative icon solution

function ShowMoreButton() {
  return (
    <div className={styles.showMoreContainer}>
      <Link to="/ShowMoreButton" className={styles.exploreLink}>
        <button className={styles.exploreButton}>
          Explore All Companies
          <ChevronRight className={styles.arrowIcon} />
        </button>
      </Link>
    </div>
  );
}

export default ShowMoreButton;