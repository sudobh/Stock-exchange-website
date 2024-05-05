import styles from "./company.module.css";
import { Link } from "react-router-dom";
function ShowMoreButton() {
  return (
    <div>
      <Link to="/ShowMoreButton">
        <button className={`${styles.explore}`}>Explore More</button>;
      </Link>
    </div>
  );
}

export default ShowMoreButton;
