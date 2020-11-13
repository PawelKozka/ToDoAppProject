import React, { useState, useEffect } from 'react';
import styles from './ModalAddTaskToProject.module.scss';

const ModalAddTaskToProject = props => {
  const minDate = new Date().toISOString().slice(0, 10);
  const [text, setText] = useState('');
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState(minDate);
  const [project, setProject] = useState(props.project.name);
  const [description, setDescription] = useState('');
  const [isDisabledButton, setDisabledButton] = useState(true);

  let maxDate = minDate.slice(0, 4) * 1 + 1;
  maxDate = maxDate + "-12-31";

  useEffect(() => {
    const modal = document.getElementById("modal-add-task-to-project");
    window.onclick = function (event) {
      if (event.target === modal) {
        props.showModalAddTask()
      }
    }
  })
  // Form actions 
  const handleDate = e => {
    setDate(e.target.value)
  };
  const handleText = e => {

    setText(e.target.value)
    if (e.target.value.length > 0) {
      setDisabledButton(false)
    } else setDisabledButton(true)
  };
  const handleDescription = e => {
    setDescription(e.target.value)
  };
  const handleCheckbox = e => {
    setChecked(e.target.checked)
  };
  const handleSelectProject = e => {
    console.log(e.target.value)
    setProject(e.target.value)
  };

  const clearForm = () => {
    setDescription('');
    setChecked(false);
    setText('');
    setDate(minDate);
  }

  const handleAddNewTask = e => {
    e.preventDefault();
    if (text.length > 2) {
      const add = props.addTask(text, date, checked, project, description);
      if (add) {
        clearForm();
        props.showModalAddTask();
      }
    } else { alert('zbyt krótka nazwa') }
  }

  const formOptions = <option value={props.project.name}>{props.project.name}</option>

  return (
    <>
      <div className={styles.modal__wrapper} id="modal-add-task">
        <div className={styles.modal__content}>
          <div className={styles.modal__content__quit} onClick={() => props.showModalAddTask()}><span>X</span></div>
          <h1 className={styles.modal__content__title}>nowe zadanie</h1>
          <form className={styles.modal__form}>
            <div className={styles.form__taskName}>
              <input className={styles.form__taskNameInput} type="text" required="required" maxLength="30" minLength="1" value={text} onChange={handleText} />
              <label className={styles.form__taskNameLabel} htmlFor="text">Zadanie {text ? `(pozostało ${30 - text.length} znaków)` : `(minimum 1 znak)`}</label>
            </div>
            <div className={styles.form__addDescription}>
              <textarea className={styles.form__addDescriptionInput} name="description" required="required" maxLength="100" minLength="1" value={description} onChange={handleDescription}></textarea>
              <label className={styles.form__addDescriptionLabel} htmlFor="decription" id="description-label">Opis  {description ? `(pozostało ${100 - description.length} znaków)` : null}</label>
            </div>
            <div className={styles.form__date}>
              <label className={styles.form__dateLabel} htmlFor="date">Zrobić do: </label>
              <input className={styles.form__dateInput} type="date" value={date} min={minDate} max={maxDate} onChange={handleDate} />
            </div>
            <div className={styles.form__checkbox}>
              <input className={styles.form__checkboxInput} type="checkbox" checked={checked} id="important" onChange={handleCheckbox} />
              <label className={styles.form__checkboxLabel} htmlFor="important">Ważne</label>
            </div>
            <div className={styles.form__chooseProject}>
              <label className={styles.form__chooseProjectLabel} htmlFor="projects">Wybierz projekt</label>
              <select className={styles.form__chooseProjectSelect} name="projects" id="projects" form="projectform" required onChange={handleSelectProject} value={project}>
                {formOptions}
              </select>
            </div>
            <button disabled={isDisabledButton} className={styles.form__button} onClick={handleAddNewTask}><span>Dodaj zadanie do listy</span></button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ModalAddTaskToProject;
