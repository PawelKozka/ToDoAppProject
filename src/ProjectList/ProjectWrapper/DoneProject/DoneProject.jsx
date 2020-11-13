import React from 'react';
import styles from './DoneProject.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faUndo } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@material-ui/core/Tooltip';

const DoneProject = props => {
  const { name, id } = props.project;

  let tasks = props.tasks;
  let taskArray = [];
  tasks.forEach(task => {
    if (task.project === name) {
      taskArray.push(task);
    }
  });

  const handleUndoFinishProjectWithTasks = () => {
    tasks.forEach(task => {
      if (task.project === name) { props.undoTaskDone(task.id) }
    })
    props.undoFinishProject(id)
  }

  return (
    <>
      <div className={styles.task__wrapper}>
        <div >
          <Tooltip title="Cofnij wykonanie" placement="left">
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faUndo} size="2x" onClick={handleUndoFinishProjectWithTasks} />
            </div>
          </Tooltip>
          <p><s>{name}</s></p>
        </div>
        <div className={styles.actions__hover} id="actions-hover">
          <Tooltip title="Usuń" placement="right">
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faMinusSquare} size="2x" onClick={() => props.deleteProject(id)} />
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  )
}

export default DoneProject;