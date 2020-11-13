import React, { useState, useEffect } from 'react';

import DateInfo from '../DateInfo/DateInfo';
import ModalEditTask from '../../Modals/ModalEditTask/ModalEditTask';
import ModalShowTaskInfo from '../../Modals/ModalShowTaskInfo/ModalShowTaskInfo';
import styles from './ActiveTask.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faCheckSquare, faEdit, faInfo } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@material-ui/core/Tooltip';

const ActiveTask = props => {
  const [showEditTaskPanel, setShowEditTaskPanel] = useState(false)
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [isHoveredDateInfo, setIsHoveredDateInfo] = useState(false);
  const style = {
    color: 'red',
  }
  const { text, date, id, important } = props.task;
  const handleEditTask = () => {
    setShowEditTaskPanel(prev => !prev)
  }

  const handleShowModalInfo = () => {
    setShowModalInfo(prev => !prev)
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
      <div className={styles.task__wrapper} >
        <div>
          <Tooltip title="Wykonaj" placement="left">
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faCheckSquare} size="2x" onClick={() => props.changeTask(id)} />
            </div>
          </Tooltip>
          <p style={important ? style : null}>{text}</p>
          <div className={styles.task__dateInfo} onMouseEnter={handleDateInfoHover} onMouseLeave={handleDateInfoHover}>
            <span className={styles.deadline}>{date}</span>
            {isHoveredDateInfo && <DateInfo date={date} />}
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

export default ActiveTask;