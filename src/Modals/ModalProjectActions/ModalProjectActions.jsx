import React, { useState, useEffect } from 'react';
import styles from './ModalProjectActions.module.scss';
import ModalEditProject from '../ModalEditProject/ModalEditProject';
import ModalAddTaskToProject from '../ModalProjectActions/ModalAddTaskToProject/ModalAddTaskToProject';
import ModalDeleteAlert from './ModalDeleteAlert/ModalDeleteAlert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faCheckSquare, faEdit, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';

const ModalProjectActions = props => {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalAddTaskToProject, setShowModalAddTaskToProject] = useState(false);
  const [showModalDeleteAlert, setShowModalDeleteAlert] = useState(false);

  useEffect(() => {
    const modal = document.getElementById("modal-project-actions");
    window.onclick = function (event) {
      if (event.target === modal) {
        props.actionPanel();
      }
    }
  })
  const handleShowEditPanel = () => {
    setShowModalEdit(prev => !prev);

  }

  const handleAddTaskToProject = () => {
    setShowModalAddTaskToProject(prev => !prev)
  }

  const handleFinishProject = () => {
    props.finishProject(props.project.id)

  }
  const handleShowAlert = () => {
    setShowModalDeleteAlert(prev => !prev)
  }
  return (
    <>
      <div className={styles.modal__wrapper} id="modal-project-actions">
        <div className={styles.modal__content}>
          <div className={styles.action} onClick={handleShowEditPanel}>
            <FontAwesomeIcon icon={faEdit} size="2x" />
            <span className={styles.action__text}>Edytuj projekt</span>
          </div>
          <div className={styles.action} onClick={handleAddTaskToProject}>
            <FontAwesomeIcon icon={faPlus} size="2x" />
            <span className={styles.action__text}>Dodaj zadanie do projektu</span>
          </div>
          <div className={styles.action} onClick={handleFinishProject}>
            <FontAwesomeIcon icon={faCheckSquare} size="2x" />
            <span className={styles.action__text}>Przenieś do wykonanych</span>
          </div>
          <div className={styles.action} onClick={() => props.showDoneTasksList()} >
            <FontAwesomeIcon icon={faChevronDown} size="2x" />
            <span className={styles.action__text}>Pokaż/ukryj wykonane zadania</span>
          </div>
          <div className={styles.action} onClick={handleShowAlert}>
            <FontAwesomeIcon icon={faMinusSquare} size="2x" />
            <span className={styles.action__text}>Usuń projekt</span>
          </div>
        </div>
      </div>
      {showModalEdit && <ModalEditProject project={props.project} editProject={props.editProject} tasks={props.tasks} handleShowEditPanel={handleShowEditPanel} />}
      {showModalAddTaskToProject && <ModalAddTaskToProject tasks={props.tasks} addTask={props.addTask} projects={props.projects} showModalAddTask={handleAddTaskToProject} project={props.project} />}
      {showModalDeleteAlert && <ModalDeleteAlert cancelAlert={handleShowAlert} deleteProject={props.deleteProject} project={props.project} />}
    </>
  )
}

export default ModalProjectActions;