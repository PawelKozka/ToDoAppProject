import React, { useState, useEffect } from 'react';
import styles from './DoneTask.module.scss';

import DateInfo from '../DateInfo/DateInfo';
import ModalEditTask from '../../Modals/ModalEditTask/ModalEditTask';
import ModalShowTaskInfo from '../../Modals/ModalShowTaskInfo/ModalShowTaskInfo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faEdit, faInfo, faUndo } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@material-ui/core/Tooltip';


const DoneTask = props => {
  const [showEditTaskPanel, setShowEditTaskPanel] = useState(false)
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [isHoveredDateInfo, setIsHoveredDateInfo] = useState(false);

  const { text, id, finishDate } = props.task;

  const date = new Date(finishDate).toLocaleDateString()

  const handleShowModalInfo = () => {
    setShowModalInfo(prev => !prev)
  }

  const handleEditTask = () => {
    setShowEditTaskPanel(prev => !prev)
  }
  const handleDateInfoHover = () => {

    setIsHoveredDateInfo(prev => !prev)
  }
  useEffect(() => {
    if (isHoveredDateInfo) {
      const hoveredDays = document.getElementById('hovered-date')
      hoveredDays.style.opacity = '1';
    }
  })
  return (
    <>
      <div className={styles.task__wrapper}>
        <div>
          <Tooltip title="Cofnij wykonanie" placement="left">
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faUndo} size="2x" onClick={() => props.undoTaskDone(id)} />
            </div>
          </Tooltip>
          <p><s>{text}</s></p>
          <div className={styles.task__dateInfo} onMouseEnter={handleDateInfoHover} onMouseLeave={handleDateInfoHover}>
            <span className={styles.deadline}>{date}</span>
            {isHoveredDateInfo && <DateInfo finish={finishDate} />}
          </div>
        </div>
        <div className={styles.actions__hover} id="actions-hover">
          <Tooltip title="Szczegóły" placement="bottom">
            <div className={styles.icon} onClick={handleShowModalInfo}>
              <FontAwesomeIcon icon={faInfo} size="2x" />
            </div>
          </Tooltip>
          <Tooltip title="Edytuj" placement="bottom">
            <div className={styles.icon} onClick={handleEditTask}>
              <FontAwesomeIcon icon={faEdit} size="2x" />
            </div>
          </Tooltip>
          <Tooltip title="Usuń" placement="right">
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faMinusSquare} size="2x" onClick={() => props.deleteTask(id)} />
            </div>
          </Tooltip>
        </div>
      </div>
      { showEditTaskPanel && <ModalEditTask task={props.task} editTask={props.editTask} projects={props.projects} showEditTaskPanel={handleEditTask} />}
      { showModalInfo && <ModalShowTaskInfo task={props.task} showModal={handleShowModalInfo} />}
    </>
  )
}

export default DoneTask;