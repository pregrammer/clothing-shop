import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/management.module.scss";

interface Iprop {
  toggleAside: () => void;
}

const ManagementHeader = ({ toggleAside }: Iprop) => {
  return (
    <div className={styles.header}>
      <h1>پنل مدیریت</h1>
      <div className={styles.hamber} onClick={toggleAside}>
        <FontAwesomeIcon icon={faBars} />
      </div>
    </div>
  );
};

export default ManagementHeader;
