import Image from "next/image";
import styles from "../styles/Modal.module.css";

const Modal = ({ children, handleClose }) => (
  <div className={styles.overlay}>
    <div className={styles.content}>
      <div className={styles.close} onClick={handleClose}>
        <Image src="/x-circle-fill.svg" alt="Sulge" width={24} height={24} />
      </div>
      {children}
    </div>
  </div>
);

export default Modal;
