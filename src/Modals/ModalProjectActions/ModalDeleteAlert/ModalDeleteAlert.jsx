import React from 'react';
import styles from './ModalDeleteAlert.module.scss';

const ModalDeleteAlert = props => {

  return (
    <div>
      <div className={styles.modal__wrapper} id="modal-cancelation-alert">
        <div className={styles.modal__content}>
          <div className={styles.modal__content__quit} onClick={() => props.cancelAlert()}><span>X</span></div>
          <h3 className={styles.modal__content__title}>Czy na pewno chcesz usunąć projekt?</h3>
          <div className={styles.modal__content__buttons}>
            <button onClick={() => props.deleteProject(props.project.id)}>Tak</button>
            <button onClick={() => props.cancelAlert()}>Nie</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalDeleteAlert;