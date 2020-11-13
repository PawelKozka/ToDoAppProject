import React, { useState, useEffect } from 'react';
import styles from './ModalAddProject.module.scss';
import ModalAddProjectAlert from './ModalAddProjectAlert/ModalAddProjectAlert';

const maxLength = 20;

const AddProjectModal = props => {
  const [name, setName] = useState('');
  const [modalCancelActive, setModalCancelActive] = useState(false);
  const [cancelForm, setCancelForm] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState(true);

  const cancelAddProjectForm = () => {
    setCancelForm(prev => !prev)
  }
  const continueAddProjectForm = () => {
    setModalCancelActive()
  }

  const handleName = (e) => {
    if (e.target.value.length > 0) {
      setIsActiveButton(false)
    } else {
      setIsActiveButton(true)
    }
    setName(e.target.value);
  }
  useEffect(() => {
    const modal = document.getElementById("modal-add-project");
    window.onclick = function (event) {
      if (event.target === modal) {
        if (name !== '') {
          setModalCancelActive(prev => !prev);
        } else {
          props.showModalAddProject()
        }
        if (cancelForm) {
          setName('');
        }
      }
    }
  })

  const handleAddNewProject = () => {
    let project = name.toLocaleLowerCase();
    const firstWord = name[0].toUpperCase();
    project = firstWord + project.slice(1, name.length)
    if (name.length > 2) {
      const addProject = props.addProject(project);
      if (addProject) {
        setName('');
        props.showModalAddProject();
      }
    } else { alert('zbyt krótka nazwa projektu') }
  }
  return (
    <>
      <div className={styles.modal__wrapper} id="modal-add-project">
        <div className={styles.modal__content}>
          <div className={styles.modal__content__quit} onClick={() => props.showModalAddProject()}><span>X</span></div>
          <h1 className={styles.modal__content__title}>Nowy Projekt</h1>
          <form className={styles.modal__content__form}>
            <div className={styles.form__addProject}>
              <input className={styles.form__input__projectName} type="text" required="required" maxLength="20" minLength="1" value={name} onChange={handleName} />
              <label className={styles.form__projectNameLabel} htmlFor="project">Projekt {name.length > 0 ? `(pozostało: ${maxLength - name.length} znaków)` : `(minimum 1 znak)`}</label>
            </div>
            <button className={styles.form__button} disabled={isActiveButton} onClick={handleAddNewProject}>Dodaj nowy projekt</button>
          </form>
        </div>
      </div>
      {modalCancelActive && <ModalAddProjectAlert cancelAddProjectForm={cancelAddProjectForm} continueAddProjectForm={continueAddProjectForm} showModalAddProject={props.showModalAddProject} />}
    </>
  )
}

export default AddProjectModal;