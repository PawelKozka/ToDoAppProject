import React, { useState, useEffect } from 'react';
import styles from './ModalEditTask.module.scss';

const ModalEditTask = props => {
  const { text, date, id, important, project, description } = props.task;
  const [newText, setNewText] = useState(text);
  const [newDate, setNewDate] = useState(date);
  const [newImportant, setNewImportant] = useState(important);
  const [newProject, setNewProject] = useState(project);
  const [newDescription, setNewDescription] = useState(description);

  useEffect(() => {
    const modal = document.getElementById("modal-edit-task")
    window.onclick = e => {
      if (e.target === modal) {
        props.showEditTaskPanel();
      }
    }
  });

  let projectOption = [...props.projects];
  const minDate = new Date().toISOString().slice(0, 10);
  let maxDate = minDate.slice(0, 4) * 1 + 1;
  maxDate = maxDate + "-12-31";

  const handleDate = e => {
    setNewDate(e.target.value)
  };
  const handleText = e => {
    setNewText(e.target.value)
  };
  const handleCheckbox = e => {
    setNewImportant(e.target.checked)
  };
  const handleSelectProject = e => {
    setNewProject(e.target.value)
  };
  const handleDescription = e => {
    setNewDescription(e.target.value)
  }

  const formOptions = projectOption.map(item => {
    item = item.name.toLowerCase();
    const firstWord = item[0].toUpperCase();
    item = firstWord + item.slice(1, item.length)
    return <option value={item} key={item}>{item}</option>
  });

  const handleFinishEditTask = (e) => {
    e.preventDefault();
    props.showEditTaskPanel();
    props.editTask(id, newText, newDate, newImportant, newProject, newDescription);
  }
  return (
    <div className={styles.modal__wrapper} id="modal-edit-task">
      <div className={styles.modal__content}>
        <div className={styles.modal__content__quit} onClick={() => props.showEditTaskPanel()}><span>X</span></div>
        <h1 className={styles.modal__content__title}>Edytuj zadanie</h1>
        <form className={styles.form}>
          <div className={styles.form__taskName}>
            <input className={styles.form__taskNameInput} type="text" required="required" value={newText} onChange={handleText} />
            <label className={styles.form__taskNameLabel} htmlFor="text">Zadanie {newText ? `(pozostało ${30 - newText.length} znaków)` : `(minimum 1 znak)`}</label>
          </div>
          <div className={styles.form__description}>
            <textarea className={styles.form__descriptionInput} name="description" required="required" value={newDescription} onChange={handleDescription}></textarea>
            <label className={styles.form__descriptionLabel} htmlFor="decription" id="description-label">Opis {newDescription ? `(pozostało ${100 - newDescription.length} znaków)` : null}</label>
          </div>
          <div className={styles.form__date}>
            <label className={styles.form__dateLabel} htmlFor="date">Zrobić do: </label>
            <input className={styles.form__dateInput} type="date" value={newDate} max={maxDate} onChange={handleDate} />
          </div>
          <div className={styles.form__checkbox}>
            <input className={styles.form__checkboxInput} type="checkbox" checked={newImportant} id="important" onChange={handleCheckbox} />
            <label className={styles.form__checkboxLabel} htmlFor="important">Ważne</label>
          </div>
          <div className={styles.form__chooseProject}>
            <label className={styles.form__chooseProjectLabel} htmlFor="projects">Wybierz projekt</label>
            <select className={styles.form__chooseProjectSelect} name="projects" id="projects" form="projectform" required onChange={handleSelectProject} value={project}>
              {formOptions}
            </select>
          </div>
          <button className={styles.form__button} onClick={handleFinishEditTask}><span>Zakończ edycję</span></button>
        </form>
      </div>
    </div>
  )
}

export default ModalEditTask;