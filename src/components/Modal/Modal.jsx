import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

    return (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h2>Are you sure you want to delete this contact?</h2>
            <div className={styles.btnCont}>
              <button onClick={onConfirm} className={styles.confirmButton}>
                Yes
              </button>
              <button onClick={onClose} className={styles.cancelButton}>
                No
              </button>
            </div>
          </div>
        </div>
    );
};

export default Modal;