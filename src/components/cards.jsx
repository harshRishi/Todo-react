import styles from "../styles/Cards.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight, faTrash } from '@fortawesome/free-solid-svg-icons';


const CardComponent = ({ details, setPending, setInprogress, setDone }) => {
  const handleMarkDone = () => {
    const temp = details;
    if (temp.status === "pending") {
      setPending((prev) => prev.filter(item => item.id !== temp.id));
    } else if (temp.status === "inProgress") {
      setInprogress((prev) => prev.filter(item => item.id !== temp.id));
    }
    temp.status = "done";
    setDone((prev) => [...prev, temp]);
  }
  const handleMarkPending = () => {
    const temp = details;
    if (temp.status === "done") {
      setDone((prev) => prev.filter(item => item.id !== temp.id));
    } else if (temp.status === "inProgress") {
      setInprogress((prev) => prev.filter(item => item.id !== temp.id));
    }
    temp.status = "pending";
    setPending((prev) => [...prev, temp]);
  }
  const handleMarkInProgress = () => {
    const temp = details;
    if (temp.status === "done") {
      setDone((prev) => prev.filter(item => item.id !== temp.id));
    } else if (temp.status === "pending") {
      setPending((prev) => prev.filter(item => item.id !== temp.id));
    }
    temp.status = "inProgress";
    setInprogress((prev) => [...prev, temp]);
  }

  const handleTaskDelete = () => {
    const temp = details;
    console.log(temp)
    if (temp.status === "done") {
      setDone((prev) => prev.filter(item => item.id !== temp.id));
    } else if (temp.status === "pending") {
      setPending((prev) => prev.filter(item => item.id !== temp.id));
    } else if (temp.status === 'inProgress') {
      setInprogress((prev) => prev.filter(item => item.id !== temp.id));
    }
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.nav}>
        {
          (details.status !== "pending") &&
          <FontAwesomeIcon
            icon={faCircleRight} rotation={180}
            style={{ cursor: "pointer" }}
            onClick={details.status === "done" ? handleMarkInProgress : handleMarkPending}
          />
        }
        {
          details.status !== "done" &&
          <FontAwesomeIcon
            icon={faCircleRight}
            style={{ cursor: "pointer" }}
            onClick={details.status === "pending" ? handleMarkInProgress : handleMarkDone}
          />
        }
        <FontAwesomeIcon
          icon={faTrash}
          style={{ color: "#fa0000", cursor: "pointer" }}
          onClick={handleTaskDelete}
        />
      </div>

      <hr />

      <div className={styles.heading}>
        {details?.title}
      </div>

      <div className={styles.footer}>
        <div className={styles.priorityTab + ' ' + styles[details?.priority.toLowerCase() + 'Priority']}>
          {details?.priority}
        </div>
        <div className={styles.deadline}>
          {details?.deadline}
        </div>
      </div>
    </div >
  )
}

export default CardComponent