import React from 'react';
import styles from './ModalAddTaskAlert.module.scss';

const ModalCancelationAlert = props => {
  const cancel = () => {
    props.cancelAlert();
  }
  const confirm = () => {
    props.cancelForm();
    props.showModalAddTask();
  }
  return (
    <div>
      <div className={styles.modal__wrapper} id="modal-cancelation-alert">
        <div className={styles.modal__content}>
          <div className={styles.modal__content__quit} onClick={() => props.cancelAlert()}><span>X</span></div>
          <h3 className={styles.modal__content__title}>Czy na pewno chcesz odrzucić bieżące działanie?</h3>
          <div className={styles.modal__content__buttons}>
            <button onClick={confirm}>Tak</button>
            <button onClick={cancel}>Nie</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalCancelationAlert;