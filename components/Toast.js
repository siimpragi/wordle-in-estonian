import styles from "../styles/Game.module.css";

const Toast = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className={styles.toast}>{message}</div>;
};

export default Toast;
