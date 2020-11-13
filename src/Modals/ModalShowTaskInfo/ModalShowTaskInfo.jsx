import React, { useEffect } from 'react';
import styles from './ModalShowTaskInfo.module.scss';


const ModalShowInfo = props => {
  useEffect(() => {
    const modal = document.getElementById("modal-show-task-info");
    window.onclick = function (event) {
      if (event.target === modal) {
        props.showModal();
      }
    }
  })
  return (
    <div className={styles.modal__wrapper}
      id="modal-show-task-info">
      <div className={styles.modal__content}>
        <div className={styles.content__infoWrapper}>
          <h3 className={styles.content__infoWrapper__title}>{props.task.text}</h3>
          <div className={styles.content__info}>
            <div className={styles.info__date}>
              <span >Ukończyć do: </span>
              <p>{props.task.date}</p>
            </div>
            <div className={styles.info__project}>
              <span>Projekt: </span>
              <p>{props.task.project} </p>
            </div>
            <div className={styles.info__important}>
              <span>Priorytet: </span>
              {props.task.important ? <p>Ważny</p> : <p>Normalny</p>}
            </div>
            <div className={styles.info__description}>
              <span>Opis: </span>
              <p>{props.task.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalShowInfo;