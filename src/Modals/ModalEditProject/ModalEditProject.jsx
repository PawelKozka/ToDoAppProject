import React, { useState, useEffect } from 'react';
import styles from './ModalEditProject.module.scss';

const maxLength = 20;

const EditProject = props => {
  const { id, name } = props.project;
  const [newName, setNewName] = useState(name);

  const handleName = (e) => {
    setNewName(e.target.value);
  }
  const finishEdit = e => {
    e.preventDefault();
    if (newName.length > 2) {
      const newProject = props.editProject(id, newName);
      if (newProject) {
        props.handleShowEditPanel();
        props.tasks.filter(task => task.project === name).forEach(task => task.project = newName)
      }
    } else { alert('zbyt krótka nazwa projektu') }

  }
  useEffect(() => {
    const modal = document.getElementById("modal-edit-project");
    window.onclick = e => {
      console.log(e, e.target)
      if (e.target === modal) {
        props.handleShowEditPanel();
      }
    }
  });

  return (
    <div className={styles.modal__wrapper} id="modal-edit-project">
      <div className={styles.modal__content}>
        <div className={styles.modal__content__quit} onClick={() => props.handleShowEditPanel()}><span>X</span></div>
        <h1 className={styles.modal__content__title}>Edytuj projekt</h1>
        <form className={styles.form}>
          <input className={styles.form__input} type="text" required="required" maxLength="20" minLength="1" value={newName} onChange={handleName} />
          <label className={styles.form__label} htmlFor="project">Projekt {newName.length > 2 ? `(pozostało: ${maxLength - newName.length} znaków)` : `(minimum 1 znak)`}</label>
          <br />
          <button className={styles.form__button} onClick={finishEdit}>Edytuj projekt</button>
        </form>
      </div>
    </div>
  )
}

export default EditProject;